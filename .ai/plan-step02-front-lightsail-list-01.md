# @.ai/plan-step02-front-lightsail-list-01.md

# follow previous implemented step : @.ai/plan-step01-service-get-all-lightsail-01.md

# context
- read : @.ai/_shared/spec-context.md

# Current plan version is V2

# Version control
## V2
- replaced html ul/li with react comopent Table
## V1
- initial version

# scope
- this plan will add a list of lightsail
- this plan will use the lambda / service "get-all-lightsails" / "GetAllLightsail" from previous plan
- the list will consume the getAllLightsails service

## add call to the service "getAllLightsails"
- in App.tsx, on the model of sayHello
  - add a function getAllLightsails which consume the service
  - add  useState "lightsails" (and setLightsail)
  - add a useEffect, this initializes the state "lightsails" with result of getAllLightsails

## add a list to display  "lightsails"
- list will be added into App.tsx under the react.js tag <main>
  - list will display value of : 
    - name
    - public ip
    - state
- list will use the "Amplify UI" component "Table"
  - @since V2 ; replace legacy ul/li from V1
  - module is @aws-amplify/ui-react 
- 
### hint : exemple for a table component
- @since V2
```
<Table
  caption=""
  highlightOnHover={false}>
  <TableHead>
    <TableRow>
      <TableCell as="th">Citrus</TableCell>
      <TableCell as="th">Stone Fruit</TableCell>
      <TableCell as="th">Berry</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>Orange</TableCell>
      <TableCell>Nectarine</TableCell>
      <TableCell>Raspberry</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Grapefruit</TableCell>
      <TableCell>Apricot</TableCell>
      <TableCell>Blueberry</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Lime</TableCell>
      <TableCell>Peach</TableCell>
      <TableCell>Strawberry</TableCell>
    </TableRow>
  </TableBody>
</Table>
```
