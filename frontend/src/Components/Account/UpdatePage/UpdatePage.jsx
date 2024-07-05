import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
const UpdatePage = () => {


  const navigate = useNavigate();

  const {id} = useParams();

  const goLogin = () => {
    navigate("/account");
  };

  const [updatePayload, setupdatePayload] = useState({
    username: "",
    email: "",
  });

  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const handlePayload = (event) => {
    const { name, value } = event.target;
    setupdatePayload((prevPayload) => ({
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

  useEffect(() => {
    const fetchUser = async () => {
        try{
          const token = localStorage.getItem("token")

            const uri = `${window.API_URL}/user`;
            const response = await axios.get(uri, {
                headers : {
                  'Authorization' : `${token}`
                }
            })
            const user = response.data;
            setupdatePayload({
                username: user.username,
                email: user.email,
            })
            setFileUrl(user.image);
        }catch(error){
            console.log(error);
        }
    }

    fetchUser();
} , [])

  const submitupdateForm = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", updatePayload.username);
    formData.append("email", updatePayload.email);
    formData.append("password", updatePayload.password);
    if (file) {
      formData.append("image", file);
    }

    try {
        const uri = `${window.API_URL}/updateuser/${id}`;
      const token = localStorage.getItem("token")
      const response = await axios.post(uri, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if([201,202].includes(response.status)){
        alert(response.data.message);
    }else if(response.status === 200){
        alert(response.data.message);
        navigate("/");
    }

    } catch (error) {
      console.log("THERE IS AN ERROR WHILE REGISTERING THE USER", error);
    }
  };

  return (
    <form
      method="post"
      className="md:col-span-2 w-full min-h-screen py-6 px-6 sm:px-16 bg-black  flex justify-center items-center"
      onSubmit={submitupdateForm}
    >
      <div className="bg-slate-700 px-8 text-white rounded-xl py-4">
        <div className="mb-6">
          <h3 className="text-2xl font-bold">Create an account</h3>
        </div>

        <div className="flex items-center space-x-6 pb-8">
          <div className="shrink-0">
            <img
              id="preview_img"
              className="h-16 w-16 object-cover rounded-full"
              src={
                file
                  ? URL.createObjectURL(file)
                  : fileUrl
              }
              alt="Current Profile"
            />
          </div>
          <label className="block">
            <span className="sr-only">Choose profile photo</span>
            <input
              type="file"
              onChange={loadFile}
              className="block  w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
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
                className="text-black outline-red-200 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md "
                placeholder="Enter name"
                value={updatePayload.username}
                onChange={handlePayload}
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
                className="text-black bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-red-200"
                placeholder="Enter email"
                value={updatePayload.email}
                onChange={handlePayload}
                readOnly
              />
            </div>
          </div>
          
        </div>
        <div className="!mt-10">
          <button className="w-full py-3 px-4 text-sm font-semibold rounded bg-red-300 hover:bg-red-200 text-white focus:outline-none cursor-pointer">
            Update an Account
          </button>
        </div>
        <p className="text-sm mt-6 text-center">
          Already have an account?
          <span
            onClick={goLogin}
            className="text-red-300 font-semibold hover:underline ml-1 cursor-pointer"
          >
            Login here
          </span>
        </p>
      </div>
    </form>
  );
};

export default UpdatePage;
