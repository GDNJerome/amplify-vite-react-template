import type { Schema } from "../../data/resource"
import { env } from "$amplify/env/get-schedulers"
import {
  SchedulerClient,
  ListSchedulesCommand,
  GetScheduleCommand,
} from "@aws-sdk/client-scheduler"

const client = new SchedulerClient({
  credentials: {
    accessKeyId: env.PROJECT_ACCESS_KEY_ID,
    secretAccessKey: env.PROJECT_SECRET_ACCESS_KEY,
  },
})

// Interpret a naive "YYYY-MM-DDTHH:mm:ss" wall-clock time in the given IANA
// timezone and return an ISO 8601 string (UTC).
function naiveToISO(naive: string, tz: string): string {
  const [datePart, timePart] = naive.split("T")
  const [Y, M, D] = datePart.split("-").map(Number)
  const [h, m, s] = timePart.split(":").map(Number)

  if (tz === "UTC") {
    return new Date(Date.UTC(Y, M - 1, D, h, m, s)).toISOString()
  }

  let guess = Date.UTC(Y, M - 1, D, h, m, s)
  for (let i = 0; i < 2; i++) {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).formatToParts(new Date(guess))
    const get = (k: string) => Number(parts.find(p => p.type === k)!.value)
    const tzAsUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"))
    guess -= tzAsUtc - guess
  }
  return new Date(guess).toISOString()
}

function extractDeleteDate(expr: string | undefined, tz: string | undefined): string | null {
  if (!expr || !tz) return null
  const match = expr.match(/^at\((.+)\)$/)
  if (!match) return null
  return naiveToISO(match[1], tz)
}

export const handler: Schema["getSchedulers"]["functionHandler"] = async () => {
  const groupName = env.PROJECT_SCHEDULER_GROUP

  const list = await client.send(new ListSchedulesCommand({ GroupName: groupName }))
  const schedules = list.Schedules ?? []

  return Promise.all(
      schedules.map(async s => {
        const detail = await client.send(new GetScheduleCommand({
          Name: s.Name!,
          GroupName: groupName,
        }))
        return {
          CreationDate: s.CreationDate ? s.CreationDate.toISOString() : null,
          LastModificationDate: s.LastModificationDate ? s.LastModificationDate.toISOString() : null,
          Name: s.Name ?? null,
          State: s.State ?? null,
          DeleteDate: extractDeleteDate(detail.ScheduleExpression, detail.ScheduleExpressionTimezone),
        }
      })
  )
}