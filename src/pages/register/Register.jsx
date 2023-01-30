import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();
      setError(false)
      try {
          const res = await axios.post("http://localhost:5000/api/auth/register", {
              username,
              email,
              password,
            });
            res.data && navigate("/login");
        } catch (error) {
            console.log(error)
            setError(true);
        }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form onSubmit={handleSubmit} className="registerForm">
        <label>Username</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Enter your Username"
        />
        <label>Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Enter your Email"
        />
        <label>Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your Password"
        />
        <button className=" bg-teal-500 py-3 rounded-xl" type="submit">
          Register
        </button>
        {error && <span className="text-red-500">Something went wrong!</span>}
      </form>
      <span className="mt-4">
        have account?{" "}
        <Link to="/login">
          <button className=" text-green-700">Login here</button>
        </Link>{" "}
      </span>
    </div>
  );
};

export default Register;
