import React, { useState, useEffect, useContext } from "react";
import { MdAccountCircle } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import { FiltersortContext } from "../context/FiltersortContext";
import { FaFacebookSquare, FaHeart, FaRegHeart } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { FaSquareXTwitter } from "react-icons/fa6";
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Navbar = () => {
  const navigate = useNavigate();
  const { search, setSearch, setCategory } = useContext(FiltersortContext);
  const [searchIcon, setSearchIcon] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [openAccount, setOpenAccount] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const url = `${window.API_URL}/user`;
        const token = localStorage.getItem("token");
        const response = await axios.get(url, {
          headers: {
            Authorization: `${token}`,
          },
        });
        if (response.status === 200) {
          setUser(response.data);
        } else {
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const logOut = async () => {
    localStorage.removeItem('token');
    setUser(null);
    alert("Logged out successfully");
    navigate("/");
  };

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  const handleCategory = (category) => {
    setCategory(category.toLowerCase());
  };

  return (
    <div className="w-full bg-white">
      <div className="flex flex-row justify-between px-4 md:px-5 min-w-screen h-20 items-center">
        <div className="flex items-center space-x-4 pl-4">
          <IoIosSearch className="cursor-pointer text-2xl md:text-3xl" onClick={() => setSearchIcon(!searchIcon)} />
          <Link to='/likeArticle'>
            <FaHeart className="text-xl md:text-2xl text-red-500" />
          </Link>
        </div>
        {searchIcon && (
          <div className="absolute space-x-4 md:space-x-8 right-0 h-16 flex items-center justify-center z-10 backdrop-blur-sm w-full md:w-auto">
            <input
              className="w-[90%] md:w-[500px] my-1 px-2 focus:outline-0 rounded-lg tracking-widest py-2 bg-gray-100"
              placeholder="Search Article..."
              type="search"
              onChange={handleSearch}
            />
            <RxCross2 onClick={() => setSearchIcon(!searchIcon)} className="text-2xl text-black cursor-pointer" />
          </div>
        )}
        <h1 className="flex justify-center md:justify-left pl-5 text-2xl sm:text-3xl lg:text-5xl py-2 md:py-4 font-serif font-semibold tracking-wide text-black">
          THE OTHER SIDE
        </h1>

        <div>
          {user ? (
            <div className="relative">
              <div className="flex items-center gap-x-2 cursor-pointer mr-5" onClick={() => setOpenAccount(!openAccount)}>
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-blue-300">
                  <img src={user.image} className="w-full h-full rounded-full" alt="" />
                </div>
                <h1 className="text-lg md:text-xl">{user.username}</h1>
                {openAccount ? <IoIosArrowDown /> : <IoIosArrowUp />}
              </div>
              {openAccount && (
                <div className="z-10 absolute right-0 top-13 bg-white border border-gray-300 w-36 md:w-40 rounded-xl flex flex-col text-lg md:text-xl font-normal tracking-wide items-center">
                  <Link to={`/addArticle`} className="py-2 md:py-3 hover:bg-black hover:text-white w-full text-center rounded-t-xl cursor-pointer">
                    Add Article
                  </Link>
                  <Link to={`/myArticle`} className="py-2 md:py-3 hover:bg-black hover:text-white w-full text-center cursor-pointer">
                    My Articles
                  </Link>
                  <Link to={`/updateUser/${user._id}`} className="py-2 md:py-3 hover:bg-black hover:text-white w-full text-center cursor-pointer">
                    Edit Profile
                  </Link>
                  <h1 onClick={logOut} className="py-2 md:py-3 hover:bg-black hover:text-white w-full text-center rounded-b-xl cursor-pointer">
                    Log Out
                  </h1>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-x-4 md:gap-x-10 px-2 md:px-4 py-1 bg-red-500 text-white hover:text-black rounded-lg">
              <Link
                to="/login"
                className="cursor-pointer font-medium tracking-wider text-lg md:text-xl gap-x-1 flex items-center"
              >
                <MdAccountCircle className="text-2xl" />
                <h1>Account</h1>
              </Link>
            </div>
          )}
        </div>
      
      </div>

      <hr className="bg-black border border-black" />

      {/* Desktop Navigation */}
      <nav className="flex justify-center items-center space-x-4 md:space-x-6 text-xs sm:text-sm md:text-sm lg:text-lg font-semibold px-2 md:px-12 text-black h-12 bg-gray-100">
        <h1 onClick={() => handleCategory("all news")} className="cursor-pointer hover:underline">
          All News
        </h1>
        <h1 onClick={() => handleCategory("politics")} className="cursor-pointer hover:underline">
          Politics
        </h1>
        <h1 onClick={() => handleCategory("social media")} className="cursor-pointer hover:underline">
          Social Media
        </h1>
        <h1 onClick={() => handleCategory("science")} className="cursor-pointer hover:underline">
          Science
        </h1>
        <h1 onClick={() => handleCategory("sports")} className="cursor-pointer hover:underline">
          Sports
        </h1>
        <h1 onClick={() => handleCategory("business")} className="cursor-pointer hover:underline">
          Business
        </h1>
        <h1 onClick={() => handleCategory("technology")} className="cursor-pointer hover:underline">
          Technology
        </h1>
        <h1 onClick={() => handleCategory("entertainment")} className="cursor-pointer hover:underline">
          Entertainment
        </h1>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col space-y-2 py-2 px-4 bg-gray-100">
          <h1 onClick={() => handleCategory("all news")} className="cursor-pointer hover:underline">
            All News
          </h1>
          <h1 onClick={() => handleCategory("politics")} className="cursor-pointer hover:underline">
            Politics
          </h1>
          <h1 onClick={() => handleCategory("social media")} className="cursor-pointer hover:underline">
            Social Media
          </h1>
          <h1 onClick={() => handleCategory("science")} className="cursor-pointer hover:underline">
            Science
          </h1>
          <h1 onClick={() => handleCategory("sports")} className="cursor-pointer hover:underline">
            Sports
          </h1>
          <h1 onClick={() => handleCategory("business")} className="cursor-pointer hover:underline">
            Business
          </h1>
          <h1 onClick={() => handleCategory("technology")} className="cursor-pointer hover:underline">
            Technology
          </h1>
          <h1 onClick={() => handleCategory("entertainment")} className="cursor-pointer hover:underline">
            Entertainment
          </h1>
        </nav>
      )}

      <hr className="bg-black border border-black" />
    </div>
  );
};

export default Navbar;
