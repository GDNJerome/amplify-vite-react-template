import { defineFunction, secret } from '@aws-amplify/backend';

export const getAllLightsails = defineFunction({
    name: 'get-all-lightsails',
    entry: './handler.ts',
    environment: {
        PROJECT_TAG: secret('PROJECT_TAG'),
        PROJECT_ACCESS_KEY_ID: secret('PROJECT_ACCESS_KEY_ID'),
        PROJECT_SECRET_ACCESS_KEY: secret('PROJECT_SECRET_ACCESS_KEY'),
    }
});