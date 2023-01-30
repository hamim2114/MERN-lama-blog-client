import axios from "axios";
import { useRef } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/Context";
import "./login.css";

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { isFetching, dispatch } = useContext(UserContext);
  const {error} = useContext(UserContext)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input ref={userRef} type="text" required placeholder="Username here" />
        <label>Password</label>
        <input ref={passwordRef} type="password" required placeholder="Password here" />
        <button disabled={isFetching} className=" disabled:bg-purple-200 disabled:cursor-wait font-bold bg-purple-400 py-3 rounded-xl" type="submit">
          {isFetching? "Login.." : "Login"}
        </button>
        {error && <span className="text-red-500 mt-3 text-center">Invalid User name or Password</span>}
      </form>
      <span className="mt-4">
        Not have account?{" "}
        <Link to="/register">
          <button className=" text-green-700">Register here</button>
        </Link>{" "}
      </span>
    </div>
  );
};

export default Login;
