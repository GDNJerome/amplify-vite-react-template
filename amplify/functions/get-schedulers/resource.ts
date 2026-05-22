import { defineFunction, secret } from '@aws-amplify/backend';

export const getSchedulers = defineFunction({
    name: 'get-schedulers',
    entry: './handler.ts',
    environment: {
        PROJECT_SCHEDULER_GROUP: secret('PROJECT_SCHEDULER_GROUP'),
        PROJECT_ACCESS_KEY_ID: secret('PROJECT_ACCESS_KEY_ID'),
        PROJECT_SECRET_ACCESS_KEY: secret('PROJECT_SECRET_ACCESS_KEY'),
    }
});