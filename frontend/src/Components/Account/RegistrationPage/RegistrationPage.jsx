import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LOGIN from "../RegistrationPage/LOGIN.jpg"
const RegistrationPage = () => {
  const navigate = useNavigate();

  const goLogin = () => {
    navigate("/login");
  };

  const [registerPayload, setRegisterPayload] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [file, setFile] = useState(null);

  const updatePayload = (event) => {
    const { 
      name, value } = event.target;
    setRegisterPayload((prevPayload) => ({
      ...prevPayload,
      [name]: value,
    }));
  };

  const loadFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", registerPayload.username);
    formData.append("email", registerPayload.email);
    formData.append("password", registerPayload.password);
    formData.append("image", file);
    

    try {
        const url = `${window.API_URL}/register`;

       

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if ([201, 202 ,203].includes(response.status)) {
        alert(response.data.message);
        return;
      }
      if (response.status === 200) {
        alert(response.data.message);
        setRegisterPayload({
          username: "",
          email: "",
          password: "",
        });
        setFile(null);
        navigate("/login");
      }
    } catch (error) {
      console.log("THERE IS AN ERROR WHILE REGISTERING THE USER", error);
    }
  };

  return (
    <div className="flex justify-center min-h-screen relative">
        <img src={LOGIN} className="backdrop-blur-xl w-full min-h-screen object-cover" alt="background" />
        <div className="items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] glassmorphism-form absolute font-[sans-serif] text-gray-800 bg-white flex items-center mt-24 rounded-xl overflow-hidden">
        <form
      method="post"
      className="md:col-span-2 w-full py-6 px-6 sm:px-16"
      onSubmit={submitForm}
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold">Create an account</h3>
      </div>

      <div className="flex items-center space-x-6 pb-8">
        <div className="shrink-0">
          <img
            id="preview_img"
            className="h-16 w-16 object-cover rounded-full"
            src={file ? URL.createObjectURL(file) : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4V2hNksnmAV1Keq-R04Jsk-hf4s1_eIz4QAz4jdsc7w&s"}
            alt="Current Profile"
          />
        </div>
        <label className="block">
          <span className="sr-only">Choose profile photo</span>
          <input
            type="file"
            onChange={loadFile}
            className="block  w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-black hover:file:bg-violet"
          />
        </label>
      </div>

      <div className="space-y-5">
        <div>
          <label className="text-sm mb-2 block">Name</label>
          <div className="relative flex items-center">
            <input
              name="username"
              type="text"
              required
              className="outline-black bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md "
              placeholder="Enter name"
              value={registerPayload.name}
              onChange={updatePayload}
            />
          </div>
        </div>
        <div>
          <label className="text-sm mb-2 block">Email Id</label>
          <div className="relative flex items-center">
            <input
              name="email"
              type="email"
              required
              className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-black"
              placeholder="Enter email"
              value={registerPayload.email}
              onChange={updatePayload}
            />
          </div>
        </div>
        <div>
          <label className="text-sm mb-2 block">Password</label>
          <div className="relative flex items-center">
            <input
              name="password"
              type="password"
              required
              className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-black"
              placeholder="Enter password"
              value={registerPayload.password}
              onChange={updatePayload}
            />
          </div>
        </div>
      </div>
      <div className="!mt-10">
        <button
          className="w-full py-3 px-4 text-sm font-semibold rounded bg-black text-white hover:bg-white hover:text-black hover:border-black hover:border focus:outline-none cursor-pointer"
        >
          Create an account
        </button>
      </div>
      <p className="text-sm mt-6 text-center">
        Already have an account?
        <span
          onClick={goLogin}
          className="text-black font-semibold hover:underline ml-1 cursor-pointer"
        >
          Login here
        </span>
      </p>
    </form>
        </div>
      </div>
  );
};

export default RegistrationPage;





