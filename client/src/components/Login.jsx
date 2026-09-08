import api from "../utils/axios.js";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);
  const navigate  = useNavigate();
  
 useEffect(() => {
  if (!message) return;

  const timer = setTimeout(() => {
    setMessage("");
    setSuccess(null);
  }, 2000);

  return () => clearTimeout(timer);
}, [message])

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = {
      email: email,
      password: password,
    }

    try {
      const response = await api.post("/auth/login", formData);

      setMessage(response.data.message);
      setSuccess(true);
      setTimeout(() => {
        navigate("/", { replace: true })
        setSuccess(null);
      }, 2000)
      

    }catch (error) {
      console.log(error.response?.data?.error);
      setMessage(error.response?.data?.error)
      setSuccess(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <fieldset className="flex flex-col">
          <legend className="text-center text-xl font-bold ">
           Login Account
          </legend>

          <label htmlFor="email" className="mt-4">
            Email or Username:
          </label>
          <input
            className="border"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="mt-4">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          { success ?  <p className="text-green-400 text-center mt-5">{message}</p>: <p className="text-red-500 text-center mt-5"  >{message}</p> }

          <button
            type="submit"
            className="mt-6 font-bold active:text-blue-500 transition-all duration-200 ease-in-out"
          >
            {" "}
            Login
          </button>
          <p>New user ? <Link to="/register">Register</Link></p>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
