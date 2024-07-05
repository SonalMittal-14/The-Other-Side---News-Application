import axios from "axios";
import React, { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const ArticleForm = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [newsPayload, setnewsPayload] = useState({
    title: "",
    author: "",
    summary: "",
    category: "",
  });

  const options = [
    { label: "politics", value: "Politics" },
    { label: "sports", value: "Sports" },
    { label: "bussiness", value: "Bussiness" },
    { label: "social media", value: "Social Media" },
    { label: "entertainment", value: "Entertainment" },
    { label: "psychology", value: "Psychology" },
    { label: "science", value: "Science" },
    { label: "technology", value: "Technology" },
  ];

  const handleFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleNewsPayload = (event) => {
    const { name, value } = event.target;
    setnewsPayload((prevNewsPayload) => ({
      ...prevNewsPayload,
      [name]: value,
    }));
  };

  const handleCategory = (event) => {
    setnewsPayload((prevNewsPayload) => ({
      ...prevNewsPayload,
      category: event.value,
    }));
  };

  const submitNewsForm = async (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("title", newsPayload.title);
    formdata.append("category", newsPayload.category);
    formdata.append("summary", newsPayload.summary);
    formdata.append("author", newsPayload.author);
    if (!file) {
      alert("please select a file");
      return;
    }
    formdata.append("image", file);
    try {
      const uri = `${window.API_URL}/addArticle`;
      const token = localStorage.getItem("token")
      const response = await axios.post(uri, formdata, {
        
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization : `${token}`
        },
      });
      if (response.status === 201) {
        navigate("/login");
      }

      if (response.status === 200) {
        setnewsPayload({
          title: "",
          category: "",
          summary: "",
          author: "",
        });
        setFile(null);
        alert(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "black",
      color: "white",
      height: "100%",
      border: "none",
      borderColor: "rgb(51 65 85)",
      outline: "none",
      boxShadow: state.isFocused ? "none" : "none",
    }),
    option: (provided, state) => ({
      ...provided,
      color: "white",
      backgroundColor: "black",
      cursor: "pointer",
    }),
  };
  return (
    <form onSubmit={submitNewsForm} class="body-font min-h-screen relative bg-white text-black">
      <div class="container w-full px-5 pt-4">
        <h1 class="title-font text-center mb-4 text-6xl font-medium font-serif text-black">
          Add Article
        </h1>

        <div class="mx-auto md:w-2/3 lg:w-1/2 mt-12 ">
          <div class=" flex flex-wrap gap-y-10">
            <div class=" flex items-center justify-center flex-col border-2 w-full border-slate-700 border-dotted px-5 py-2 rounded-xl">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full rounded-lg cursor-pointer"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    class="w-8 h-8 mb-4 text-black dark:text-black"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p class="mb-2 text-sm text-black">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-xs text-black">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  name="image"
                  id="dropzone-file"
                  type="file"
                  class="hidden"
                  onChange={handleFile}
                />
              </label>

              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  className="w-96 h-60"
                  alt=""
                />
              )}
            </div>

            <div className="flex w-full space-x-4 ">
              <div class="w-[50%] ">
                <div class="relative">
                  <input
                    type="text"
                    id="title"
                    name="title"
                    class="peer w-full rounded border border-black  bg-opacity-40 py-1 px-3 text-base leading-8 text-black placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
                    placeholder="Title"
                    value={newsPayload.title}
                    onChange={handleNewsPayload}
                  />
                  <label
                    for="title"
                    class="absolute left-3 -top-6  text-sm leading-7 text-indigo-500 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-black"
                  >
                    Title
                  </label>
                </div>
              </div>

              <div class="w-[50%]">
                <div class="relative">
                  <input
                    type="text"
                    id="author"
                    name="author"
                    class="peer w-full rounded border border-gray-700  bg-opacity-40 py-1 px-3 text-base leading-8 text-black placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-black text-black focus:bg-white focus:ring-1 focus:ring-black"
                    placeholder="Author"
                    value={newsPayload.author}
                    onChange={handleNewsPayload}
                  />
                  <label
                    for="author"
                    class="absolute left-3 -top-6 bg-transparent text-sm leading-7 text-indigo-500 text-black transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-black"
                  >
                    Author
                  </label>
                </div>
              </div>
            </div>

            <Select
              onChange={handleCategory}
              name="category"
              id="category"
              required
              options={options}
              styles={customStyles}
              className="text-white w-full focus:outline-none "
            />

            <div class=" w-full ">
              <div class="relative">
                <textarea
                  value={newsPayload.summary}
                  onChange={handleNewsPayload}
                  placeholder="Enter Article Summary"
                  name="summary"
                  id="summary"
                  required
                  class="peer h-32 w-full resize-none rounded border border-gray-700 bg-white bg-opacity-40 py-1 px-3 text-base leading-6 text-black placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-black focus:bg-white  focus:ring-1 focus:ring-black"
                ></textarea>
                <label
                  for="summary"
                  class="absolute left-3 -top-6 bg-transparent text-sm leading-7 text-indigo-500 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2  peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-black"
                >
                  Summary
                </label>
              </div>
            </div>

            <div class="w-full mb-10 p-2">
              <button class="mx-auto flex rounded border-0 bg-black hover:bg-white hover:text-black hover:border hover:border-black hover:ring-1 py-2 px-8 text-lg text-white  focus:outline-none">
                Add Article
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ArticleForm;
