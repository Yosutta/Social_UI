import React, { version } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
console.log(version);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
