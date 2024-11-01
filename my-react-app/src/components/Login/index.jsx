import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"
import { useNavigate } from "react-router";
import "./index.css";


const Login = () => {
    const navigate=useNavigate()
  const [errMsg, setErrMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSucessLogin=(jwtToken)=>{
    navigate("/welcome")
  }

  const onChangeEvent = (event) => {
    const { id, value } = event.target;
    if (id === "email") {
      setEmail(value);
    } else if (id === "password") {
      setPassword(value);
    }
  };

  const loginForm = async (event) => {
    event.preventDefault();
    const data = { email, password };
    const url = "http://localhost:4000/login";

    try {
      const response = await axios.post(url, data);
      const responseData = response.data
      console.log(responseData)
      setErrMsg(responseData.message);
      const jwtToken=responseData.token
      console.log(jwtToken)
      if (jwtToken){
        Cookies.set("jwt_token",jwtToken)
        console.log(Cookies.get("jwt_token"))
        onSucessLogin(jwtToken)
      }
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <form onSubmit={loginForm}>
          <div style={{ display: "flex" }}>
            <label htmlFor="email" className="label-container">
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={onChangeEvent}
              value={email}
              required
            />
          </div>
          <div style={{ display: "flex" }}>
            <label htmlFor="password" className="label-container">
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={onChangeEvent}
              value={password}
              required
            />
          </div>
          <br />
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="submit">Login</button>
          </div>
          <p>{errMsg}</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
