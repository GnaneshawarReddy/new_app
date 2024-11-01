import React from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Welcome from "./components/welcome";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/welcome" element={<Welcome/>} />
        </Routes>
      </Router>
    </>
  );
};
export default App;
