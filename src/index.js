import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import App from "./components/App";
import { HostProvider } from './context/host'

ReactDOM.render(
    <HostProvider>
        <App />
    </HostProvider>,
    document.getElementById("root")
);
