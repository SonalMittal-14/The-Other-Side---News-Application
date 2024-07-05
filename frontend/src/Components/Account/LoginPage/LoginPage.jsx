import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";
import LOGIN from "../LoginPage/LOGIN.jpg";

const LoginPage = () => {
  const navigate = useNavigate();

  const [loginPayload, setLoginPayload] = useState({
    email: "",
    password: ""
  });

  const goRegister = () => {
    navigate("/register");
  };

  const handlePayload = (event) => {
    const { name, value } = event.target;
    setLoginPayload((prevPayload) => ({
      ...prevPayload,
      [name]: value
    }));
  };

  const submitLogin = async (event) => {
    event.preventDefault();
    try {
      const url = `${window.API_URL}/login`;

      const response = await axios.post(url, loginPayload, {
        withCredentials: true
      });
      if (response.status === 201) {
        alert(response.data.message);
        setLoginPayload({
          email: "",
          password: ""
        });
        navigate('/register');
      } else if (response.status === 202) {
        alert(response.data.message);
        setLoginPayload((prevPayload) => ({
          ...prevPayload,
          password: ""
        }));
      } else if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        alert(response.data.message);
        setLoginPayload({
          email: "",
          password: ""
        });
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-center min-h-screen relative">
        <img src={LOGIN} className="backdrop-blur-xl w-full min-h-screen object-cover" alt="background" />
        <div className="items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] glassmorphism-form absolute font-[sans-serif] text-gray-800 bg-white flex items-center mt-48 rounded-xl overflow-hidden">
        <form
            onSubmit={submitLogin}
            className="md:col-span-2 w-[400px] py-6 px-6  "
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white text-center">Sign In to your account</h3>
            </div>
            <div className="space-y-5 text-white">
              <div>
                <label className="text-sm mb-2 block">Email Id</label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    required
                    className="bg-white border text-black border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-black-200"
                    placeholder="Enter email"
                    value={loginPayload.email}
                    onChange={handlePayload}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-4 h-4 absolute right-4"
                    viewBox="0 0 682.667 682.667"
                  >
                    <defs>
                      <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                      </clipPath>
                    </defs>
                    <g
                      clipPath="url(#a)"
                      transform="matrix(1.33 0 0 -1.33 0 682.667)"
                    >
                      <path
                        fill="none"
                        strokeMiterlimit="10"
                        strokeWidth="40"
                        d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                        data-original="#000000"
                      ></path>
                      <path
                        d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                        data-original="#000000"
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>
              <div>
                <label className="text-sm mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    required
                    className="bg-white text-black border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-black"
                    placeholder="Enter password"
                    value={loginPayload.password}
                    onChange={handlePayload}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-4 h-4 absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="!mt-10">
              <button
                className="w-full py-3 px-4 text-sm font-semibold rounded bg-black hover:bg-white hover:text-black text-white hover:border hover:border-black focus:outline-none cursor-pointer"
              >
                Sign In
              </button>
            </div>

            <h1 className="text-sm mt-6 flex justify-center">
              Don't have an account?{" "}
              <p
                onClick={goRegister}
                className="text-black font-semibold hover:underline ml-1 cursor-pointer"
              >
                Register here
              </p>
            </h1>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;


