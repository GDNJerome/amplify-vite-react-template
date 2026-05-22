import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { Authenticator } from '@aws-amplify/ui-react';
import {Amplify} from 'aws-amplify';

import outputs from "../amplify_outputs.json";

import '@aws-amplify/ui-react/styles.css';
import '@aws-amplify/ui-react/styles/reset.layer.css' // global CSS reset
import '@aws-amplify/ui-react/styles/base.layer.css' // base styling needed for Amplify UI
import '@aws-amplify/ui-react/styles/button.layer.css' // component specific styles

//import '@fontsource/inter/inter.css';
import "./index.css";

// https://ui.docs.amplify.aws/react/getting-started/installation

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
<React.StrictMode>
    <Authenticator>
        <App />
    </Authenticator>
</React.StrictMode>
);
