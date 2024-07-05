import React , {useEffect , useState} from "react";
import { FaArrowRight } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useNavigate , Link } from "react-router-dom";
const Article = ({ article , handleDelete }) => {
  const navigate = useNavigate();

  const maxLength = 25;
  const title =
    article.title.length > maxLength
      ? `${article.title.slice(0, maxLength)}...`
      : article.title;

      const [isAuthorized , setisAuthorized] = useState(false);


  const navigateArticleDetails = async (id) => {
    const url = `${window.API_URL}/isAuthorized`
    const token = localStorage.getItem("token")
    const isAuth = await axios.get(url , {
        headers : {
          Authorization : token
        }
    }
  )


    if([201,202,401].includes(isAuth.status)){
        alert(isAuth.data.message);
        navigate("/login");
    }
    else if(isAuth.status === 200){
        navigate(`/articleDetails/${id}`);
    }
}

  return (
    <div onClick={() => navigateArticleDetails(article._id)}  className={`border h-80 w-[100%]  pb-4 sm:h-48 lg:h-42 sm:w-[90%] lg:w-[48%] flex flex-col sm:flex-row cursor-pointer border-gray-200 rounded-xl bg-gray-100`}>
     
        <img
          src={article.image}
          className={`sm:w-[40%] w-full h-48 `}
          alt=""
        />
        <div className="flex flex-col pt-4 px-6 space-y-4">
  
          <h1 className="text-2xl font-semibold"> {title}</h1>
          <div className="flex flex-col space-y-2">
            <h1>{article.author}</h1>
            <h1>{new Date(article.createdAt).toLocaleString()}</h1>
          </div>
        </div>
      </div>
     
  );
};

export default Article;
