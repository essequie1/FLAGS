import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import LangProvider from "./context/LangProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LangProvider>
    <App />
  </LangProvider>
);
