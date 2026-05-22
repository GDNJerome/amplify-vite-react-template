/*
import type { Handler } from 'aws-lambda';

export const handler: Handler = async (event, context) => {
    // your function code goes here
    return 'Hello, World!';
};

*/

import type { Schema } from "../../data/resource"
import { env } from "$amplify/env/say-hello"

export const handler: Schema["sayHello"]["functionHandler"] = async (event) => {

  console.log( process.env)

  console.log( `XYZ : ${env.XYZ}`)
  console.log( `FOO : ${env.FOO}`)



  console.log("sur service hello")
  // arguments typed from `.arguments()`
  const { name } = event.arguments
  console.log( `valeur : ${name}`)

  // return typed from `.returns()`
  return `Hello, ${name}!`
}
