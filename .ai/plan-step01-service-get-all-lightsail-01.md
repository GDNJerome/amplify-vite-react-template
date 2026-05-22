# @.ai/plan-step01-service-get-all-lightsail-01.md

# context
- read : @.ai/_shared/spec-context.md
- 
# Current plan version is V2

# Version control
## V3
- add more informations about the lightsail
## V2
- env.TAG changed to env.PROJECT_TAG
- credential changed to use secret PROJECT_ACCESS_KEY_ID and PROJECT_SECRET_ACCESS_KEY
## V1
- initial version

# scope
- create new amplify lambda function to access information for a selection of lightsail
  - selection will be done thought an aws tag associated to corresponding lightsail
- function name : get-all-lightsails
- only focus on the lambda on the backend, usage in the front will be done in a different plan

# pattern
- build the lambda on the same pattern of lambda "say-hello.ts"  sayHello
  - source code in /amplify/functions/get-all-lightsails
  - data access in /amplify/data/resources.ts

# expected result
- new lambda get-all-lightsails with handler.ts, resource.ts
- an entry "getAllLightsails" for the lambda in /amplify/data/resources.ts, under a.schema object
- lambda / service added to /amplify/functions/backend.ts

# actions
- call the aws lightsail js api ( "@aws-sdk/client-lightsail"), GetInstancesCommand to list lightsail
  - filter using :
    - tag provided as name = value of env.PROJECT_TAG, value=true (which is a secret)
      - @since V2 :  will use the name PROJECT_TAG instead of TAG
    - resourceType of "Instance"
- return a filtered array of object with : 
  - name
  - arn
  - createdAt
  - isStaticIp
  - privateIpAddress
  - publicIpAddress
  - ipv6Addresses
  - ipAddressType
  - "ramSize" matching value of hardware.ramSizeInGb
    - @since V3
  - "cpu" matching value of hardware.cpuCount
    - @since V3
  - "diskSize" matching value of hardware.disks[0].sizeInGb
    - @since V3
    - hint : there will always be a single disk therefore harware.disks.count == 1, always
  - username
    - @since V3

## credential
 - @since V2 : will use specific credential
 - on current version, services use logged used credential, project has an already iam user assigned with specific right an limitation
 - credential for LightsailClient will use 2 secrets : 
   - PROJECT_ACCESS_KEY_ID
   - PROJECT_SECRET_ACCESS_KEY

## hint for "PROJECT_TAG"
- env.PROJECT_TAG will be a secret and not a simple environnement variable
  - @since V2 : will use the name PROJECT_TAG instead of TAG

# Human only
** Section only used by human** -> skip, including subsection, **don't read**

lister les lightsail en cli correspondant à un tag
aws lightsail get-instances --query "instances[?tags[?key == 'GDN::Previsionnel::Lightsail']]"  --profile AdministratorAccessCICDAmplify

information sur un serveur
aws lightsail get-instance --instance-name Gdn-GdnIntranet-staging --profile AdministratorAccessCICDAmplify