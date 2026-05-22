# @.ai/plan-step03-scheduler-01.md

# context
- read : @.ai/_shared/spec-context.md

# Current plan version is V1

# Version control
# V1
- initial version

# scope
- create new amplify lambda function to access information for a selection of (aws eventbridge) scheduler
  - selection will be done thought the name of a scheduler group
    - name of the "scheduler group" will be given through env, which will be the secret PROJECT_SCHEDULER_GROUP
- function name : get-schedulers
- only focus on the lambda on the backend, usage in the front will be done in a different plan

# pattern
- build the lambda on the same pattern of lambda "say-hello.ts" / sayHello.
    - source code in /amplify/functions/get-schedulers
    - data access in /amplify/data/resources.ts

# expected result
- new lambda get-schedulers with handler.ts, resource.ts
- an entry "getSchedulers" for the lambda in /amplify/data/resources.ts, under a.schema object
- lambda / service added to /amplify/functions/backend.ts

# action
- call the aws eventbridge scheduler js api ( "@aws-sdk/client-scheduler"), ListSchedulesCommand to list the scheduler
  - filter the list using scheduler group name
    - value for filter is value of env / secret PROJECT_SCHEDULER_GROUP
- for each result from previous call, get information about scheduler
  - call the aws eventbridge scheduler js api ( "@aws-sdk/client-scheduler"), GetScheduleCommand to get scheduler information
    - take "Name" parameters from the previous result, "Name" property
    - look for value of property "ScheduleExpression" and "ScheduleExpressionTimezone", those values are used in the finale result

## final result
- return an array of object with for each scheduler : 
  - CreationDate : taken as it from the first result
  - LastModificationDate : taken as it from the first result
  - Name : taken as it from the first result
  - State : taken as it from the first result
  - DeleteDate : will be an iso 8601 date, extract this value from "ScheduleExpression" and "ScheduleExpressionTimezone"
    - "ScheduleExpression" is on format "at(<date and time>)"
    - exemple with 
      - "ScheduleExpression" : "at(2026-05-21T14:10:22)" 
      - "ScheduleExpressionTimezone": "UTC"
        - expect date value after conversion : "2026-05-21T14:10:22000+02:00"


## credential
 - project has an already iam user assigned with specific limitations right
 - this credential has to be used in place of current logged user's one
 - credential for "SchedulerClient" will use 2 secrets : 
   - PROJECT_ACCESS_KEY_ID
   - PROJECT_SECRET_ACCESS_KEY

## hint, exemple of json returned by ListSchedulesCommand
```json
{
  "Schedules": [
    {
      "Arn": "arn:aws:scheduler:eu-west-3:238339492858:schedule/Gdn_CICD_Destroy_gdnintranet/Gdn-GdnIntranet-gi2-rbac-1779372622",
      "CreationDate": "2026-05-20T16:10:25.216000+02:00",
      "GroupName": "Gdn_CICD_Destroy_gdnintranet",
      "LastModificationDate": "2026-05-20T16:10:25.216000+02:00",
      "Name": "Gdn-GdnIntranet-gi2-rbac-1779372622",
      "State": "ENABLED",
      "Target": {
        "Arn": "arn:aws:lambda:eu-west-3:238339492858:function:Gdn_CICD_Destroy_Lambda_gdnintranet"
      }
    }
  ]
}
```

## hint, exemple of json returned by GetScheduleCommand
```json
{
    "ActionAfterCompletion": "NONE",
    "Arn": "arn:aws:scheduler:eu-west-3:238339492858:schedule/Gdn_CICD_Destroy_gdnintranet/Gdn-GdnIntranet-gi2-rbac-1779372622",
    "CreationDate": "2026-05-20T16:10:25.216000+02:00",
    "FlexibleTimeWindow": {
        "Mode": "OFF"
    },
    "GroupName": "Gdn_CICD_Destroy_gdnintranet",
    "LastModificationDate": "2026-05-20T16:10:25.216000+02:00",
    "Name": "Gdn-GdnIntranet-gi2-rbac-1779372622",
    "ScheduleExpression": "at(2026-05-21T14:10:22)",
    "ScheduleExpressionTimezone": "UTC",
    "State": "ENABLED",
    "Target": {
        "Arn": "arn:aws:lambda:eu-west-3:238339492858:function:Gdn_CICD_Destroy_Lambda_gdnintranet",
        "Input": "{\"project\":\"Gdn-GdnIntranet-gi2-rbac\",\"scheduleName\":\"Gdn-GdnIntranet-gi2-rbac-1779372622\",\"bridgeName\":\"Gdn_CICD_Destroy_gdnintranet\"}",
        "RetryPolicy": {
            "MaximumEventAgeInSeconds": 86400,
            "MaximumRetryAttempts": 185
        },
        "RoleArn": "arn:aws:iam::238339492858:role/service-role/Gdn_CICD_EventsBridge_gdnintranetRole"
    }
}

```

# Human only
** Section only used by human** -> skip, don't read

info sur un scheduler
aws scheduler get-schedule --name Gdn-GdnIntranet-gi2-rbac-1779372622 --group-name Gdn_CICD_Destroy_gdnintranet --profile AdministratorAccessCICDAmplify
