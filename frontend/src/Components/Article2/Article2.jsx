import React , {useEffect , useState} from "react";
import { FaArrowRight } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useNavigate , Link } from "react-router-dom";
import { MdOutlineMoreVert } from "react-icons/md";

const Article2 = ({ article , handleDelete }) => {
  const navigate = useNavigate();

  const [editDelete , setEditDelete] = useState(false); 

  const maxLength = 25;
  const title =
    article.title.length > maxLength
      ? `${article.title.slice(0, maxLength)}...`
      : article.title;


 

  const editArticle = (id) => {
    const isAuthorized = async () => {
        const uri = `${window.API_URL}/isAuthorized`;
        const token = localStorage.getItem("token")
        const res = await axios.get(uri , {
          headers : {
            Authorization : token
          }
        })
        
        console.log(res);
        if(res.status === 200){
          navigate(`/updateArticle/${id}`)
        } else{
            alert("Unauthorized User! Please Login First!!!")
            navigate('/login');
        }
      }
      isAuthorized();
  }

  const deleteArticle = async (id) => {
    try {
      const url = `${window.API_URL}/deleteArticle/${id}`;
      const token = localStorage.getItem("token")
      const response = await axios.delete(url, {
        headers : {
          Authorization : token
        }
      });

      if (response.status === 201) {
        alert(response.data.message);
        navigate('/account')
      }
      if (response.status === 200) {
        alert(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log("Internal Servor Error", error);
    }
  };

  const navigateArticleDetails = async (id) => {
           
    const token = localStorage.getItem("token")
    const url = `${window.API_URL}/isAuthorized`
    const isAuth = await axios.get(url , {
        headers : {
          Authorization : token
        }
    }) 


    if([201,202,401].includes(isAuth.status)){
        alert(isAuth.data.message);
        navigate("/account");
    }
    else if(isAuth.status === 200){
        navigate(`/articleDetails/${id}`);
    }
}

  return (
    <div className={`border cursor-pointer border-gray-200 w-[450px] rounded-xl bg-gray-200`}>
      <div className={`relative overflow-hidden w-[450px] h-72 rounded-xl`}>
      <MdOutlineMoreVert onClick={() => setEditDelete(!editDelete)} className='text-white absolute z-10 text-3xl font-bold right-3 top-2'/>   
      <div onClick={() => navigateArticleDetails(article._id)}>

      
        <img
          src={article.image}
          className={`w-[450px] h-72 absolute `}
          alt=""
        />
        <div className="flex flex-col text-white  px-4 pt-3 absolute bottom-0 h-20 w-full">
        
          <h1 className="text-3xl font-semibold"> {title}</h1>
          <div className="flex">
            <h1>{article.author}</h1>
            
            <h1>{new Date(article.createdAt).toLocaleString()}</h1>
          </div>
        </div>
        </div>
        {
            editDelete && 
            <div className='bg-white text-black flex flex-col rounded-xl absolute right-2 overflow-hidden top-10'>
                    <button onClick={() =>  editArticle(article._id)} className='border border-gray-200  py-3 px-6 hover:bg-gray-400'>Edit</button>
                    <button onClick={() => deleteArticle(article._id)} className='border border-gray-200  py-3 px-6 hover:bg-gray-400'>Delete</button>

            </div>
        }
      </div>
      
     
    </div>
  );
};

export default Article2;
