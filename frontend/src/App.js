import "./App.css";
import React from "react";
import MainPage from "./Pages/MainPage";
function App() {
  return (
    <div>
      <MainPage />
      {process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_DEV_MODE
        : process.env.REACT_APP_PRO_MODE}
    </div>
  );
}

export default App;
