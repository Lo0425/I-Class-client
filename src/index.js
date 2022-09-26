import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "tw-elements";
import "./input.css";

import { BrowserRouter as Router } from "react-router-dom";

let root = ReactDOM.createRoot(document.getElementById("root"));

root.render(

    <Router>
      <App />
    </Router>
);
