import { defineBackend } from '@aws-amplify/backend';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { sayHello } from './functions/say-hello/resource';
import { getAllLightsails } from './functions/get-all-lightsails/resource';
import { getSchedulers } from './functions/get-schedulers/resource';

const backend = defineBackend({
  auth,
  data,
  sayHello,
  getAllLightsails,
  getSchedulers,
});

backend.getAllLightsails.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    actions: ['lightsail:GetInstances'],
    resources: ['*'],
  }),
);
