import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { TfiReload } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '', role: 'student' });
  const [showPassword, setShowPassword] = useState(false);

  // captcha
  const randomString = Math.random().toString(36).slice(8).toLocaleUpperCase();
  const [captcha, setCaptcha] = useState(randomString);
  const [text, setText] = useState("");
  const [captchaValid, setCaptchaValid] = useState(true); // Initialize to true

  const changeCaptcha = () => {
    setCaptcha(Math.random().toString(36).slice(8).toLocaleUpperCase());
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (text.toLocaleLowerCase() === captcha.toLocaleLowerCase()) {
      setCaptchaValid(true);
      console.log(credentials)
      try {
        const response = await fetch('http://localhost:4000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: credentials.email, password: credentials.password, role: credentials.role }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
          if (credentials.role === "students") {
            localStorage.setItem('token', json.token);
            navigate('/');
          } else {
            localStorage.setItem('token', json.token);
            navigate('/admin')
          }
        } else {
          alert('Invalid credentials');
        }
      } catch (error) {
        console.error('Error during login:', error);
        // Handle the error appropriately, e.g., show an error message to the user
      }
    } else {
      setCaptchaValid(false);
      console.log("Failed");
    }
  };

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const toggleshowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex lg:justify-center h-screen">
      <div className="bg-white lg:p-20 rounded-lg w-[85%] lg:w-1/2 space-y-8 mt-12">
        <h1 className="text-3xl font-bold text-center">
          Welcome to ERP System
        </h1>
        <div className="space-y-6 w-full lg:w-[80%] ml-9 shadow-lg p-10">
          <h2 className="text-2xl font-semibold text-gray-500 text-center underline">
            Login
          </h2>
          <div className="mb-4">
            <select
              className="w-full p-2 border rounded"
              name="role"
              value={credentials.role}
              onChange={handleOnChange}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email-Id"
              name="email"
              className="w-full p-2 border rounded"
              value={credentials.email}
              onChange={handleOnChange}
            />
          </div>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              className="w-full p-2 border rounded"
              value={credentials.password}
              onChange={handleOnChange}
            />
            <span
              className="absolute right-3 top-3 text-xl"
              onClick={toggleshowPassword}
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
          </div>
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Captcha"
              className={`w-full p-2 border-2 rounded ${
                !captchaValid ? "border-red-600" : "border-gray-300"
              }`}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setCaptchaValid(true);
              }}
            />
            <span className="absolute right-1 py-1 px-3 font-bold rounded-lg top-[.3rem] flex justify-center bg-gray-600 text-white text-md">
              {captcha}
              <TfiReload
                className="mt-1 ml-3 hover:cursor-pointer"
                onClick={changeCaptcha}
              />
            </span>
            {!captchaValid && <span className="absolute left-5 -bottom-3 font-semibold bg-white text-red-600">invalid captcha</span>}
          </div>

          <button
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
      <div className="w-1/2 hidden lg:block">
        <img src="images/login.jpg" alt="" className="object-cover w-[40rem]" />
      </div>
    </div>
  );
}

export default Login;
