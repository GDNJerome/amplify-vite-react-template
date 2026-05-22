import type { Schema } from "../../data/resource"
import { env } from "$amplify/env/get-all-lightsails"
import { LightsailClient, GetInstancesCommand } from "@aws-sdk/client-lightsail"

const client = new LightsailClient({
  credentials: {
    accessKeyId: env.PROJECT_ACCESS_KEY_ID,
    secretAccessKey: env.PROJECT_SECRET_ACCESS_KEY,
  },
})

export const handler: Schema["getAllLightsails"]["functionHandler"] = async () => {
  const response = await client.send(new GetInstancesCommand({}))
  const instances = response.instances ?? []

  return instances
      .filter(i => i.resourceType === "Instance")
      .filter(i => (i.tags ?? []).some(t => t.key === env.PROJECT_TAG && t.value === "true"))
      .map(i => ({
        name: i.name ?? null,
        arn: i.arn ?? null,
        createdAt: i.createdAt ? i.createdAt.toISOString() : null,
        isStaticIp: i.isStaticIp ?? null,
        privateIpAddress: i.privateIpAddress ?? null,
        publicIpAddress: i.publicIpAddress ?? null,
        ipv6Addresses: i.ipv6Addresses ?? [],
        ipAddressType: i.ipAddressType ?? null,
        state: i.state?.name ?? null,
      }))
}