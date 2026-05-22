import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { sayHello } from "../functions/say-hello/resource"
import { getAllLightsails } from "../functions/get-all-lightsails/resource"
import { getSchedulers } from "../functions/get-schedulers/resource"

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({

  sayHello: a
      .query()
      .arguments({
        name: a.string(),
      })
      .returns(a.string())
      .authorization(allow => [allow.authenticated()])
      .handler(a.handler.function(sayHello)),

  LightsailInstance: a.customType({
    name: a.string(),
    arn: a.string(),
    createdAt: a.string(),
    isStaticIp: a.boolean(),
    privateIpAddress: a.string(),
    publicIpAddress: a.string(),
    ipv6Addresses: a.string().array(),
    ipAddressType: a.string(),
    state: a.string(),
    ramSize: a.float(),
    cpu: a.integer(),
    diskSize: a.integer(),
    username: a.string(),
  }),

  getAllLightsails: a
      .query()
      .returns(a.ref('LightsailInstance').array())
      .authorization(allow => [allow.authenticated()])
      .handler(a.handler.function(getAllLightsails)),

  Scheduler: a.customType({
    CreationDate: a.string(),
    LastModificationDate: a.string(),
    Name: a.string(),
    State: a.string(),
    DeleteDate: a.string(),
    Project: a.string(),
  }),

  getSchedulers: a
      .query()
      .returns(a.ref('Scheduler').array())
      .authorization(allow => [allow.authenticated()])
      .handler(a.handler.function(getSchedulers)),

});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
