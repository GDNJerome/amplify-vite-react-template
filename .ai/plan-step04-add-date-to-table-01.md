# @.ai/plan-step04-add-date-to-table-01.md

# context
- read : @.ai/_shared/spec-context.md

# Current plan version is V1

# Version control
# V1
- initial version

# scope
- update the table component on App.tsx to include  new column "Started at" and "End at"
- will use result of lambda "get-schedulers" / "GetSchedulers" *already implemented* on a previous plan to get "End at" information
- will use result of lambda "get-all-lightsail" / "GetAllLightsails" *already implemented* on a previous plan to get "End at" information

# expect result
- the table component updated with new column "Started at" and "End at" for each row, which is a lightsail information
- "Started at" will be displayed in a human-readable format
- "End at" will be displayed in a human-readable format

# action
- Call the service "get-schedulers" / "GetSchedulers" to retrieve the list of scheduler
  - call the lambda only once, don't call it for each object lightsail to display (therefore cache the result)
- while mapping the lightsail object into the table component : 
  - add "Started at" value
    - hint : "Started at" correspond to  "createdAt" of result of "get-all-lightsails" / "GetAllLightsails"
    - hint : there will always be a valid value
  - add "End at" value
    - hint : "End at" correspond to  "DeleteDate" of result of "get-schedulers" / "GetSchedulers"
    - hint :  a "lightsails" may not have a "scheduler", in this case display "--" 
  
## hint
- "get-schedulers" / "GetSchedulers" expose the property "Name", this map to the property "name" of lambda "get-all-lightsails" / "GetAllLightsails"
    - this property has to be used to link both array of object
    - a "lightsails" may not have a "scheduler"