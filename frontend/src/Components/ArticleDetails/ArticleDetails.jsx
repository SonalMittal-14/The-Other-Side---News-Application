import React, { useEffect, useState  } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import DefaultComponent from "../Comment/DefaultComponent/DefaultComponent.jsx"
const ArticleDetails = ({handleopenAccount }) => {

    const navigate = useNavigate();

    const [articleDetails , setarticleDetails] = useState({});
    const { id } = useParams();
    const [isLiked, setIsLiked] = useState(false);
    
   
   
    const deleteArticle = async () => {
        try{
            const url = `${window.API_URL}/deleteArticle/${id}`;
            const token = localStorage.getItem("token")
            const response = await axios.delete(url , {
                headers : {
                  Authorization : token
                }
            });

            if(response.status === 201){
                alert(response.data.message)
            }
            if(response.status === 200){
                alert(response.data.message)
                navigate('/');
            }

        }catch(error){
            console.log("Internal Servor Error",error);
        }
    }

    const editArticle = async () => {
        const url = `${window.API_URL}/isAuthorized`
        const token = localStorage.getItem("token")
            const isAuth = await axios.get(url , {
                headers : {
                  Authorization : token
                }
            }) 


            if([201,202,401].includes(isAuth.status)){
                alert(isAuth.data.message);
                navigate("/loginPage");
            }
            else if(isAuth.status === 200){
                navigate(`/updateArticleForm/${id}`);
            }
    }

    useEffect(() => {
        const fetchArticleDetails = async () => {
          try {
            const url = `${window.API_URL}/getArticle/${id}`;
            const token = localStorage.getItem("token")
            const response = await axios.get(url, { 
              headers: {
                Authorization : token
              }
             }) ;
    
            if (response.status === 201) {
              alert(response.data.message);
              navigate('/login');
              return;
            } else if (response.status === 200) {
                setarticleDetails(response.data.article);
              setIsLiked(response.data.article.isLiked);
            } else {
              throw new Error('Unexpected response status');
            }
          } catch (error) {
            console.error('Error fetching article details:', error);
            alert('Failed to fetch article details.');
          }
        };
    
        fetchArticleDetails();
      }, [id, navigate]);
    
      const handleLikeToggle = async () => {
        try {
          const uri = `${window.API_URL}/likeArticle/${id}`;
          const token = localStorage.getItem("token")
          const response = await axios.post(uri, {}, { 
            headers : {
              Authorization : token
            }
           });
    
          if (response.status === 200) {
            setIsLiked(response.data.isLiked);
            alert(response.data.isLiked ? 'Article liked!' : 'Article unliked!');
          } else {
            throw new Error('Unexpected response status');
          }
        } catch (error) {
          console.error('Error updating like status:', error);
          alert('An error occurred while updating like status.');
        }
      };
   
  return (
    <>
    <div className='flex justify-center'>
            <div className="w-[70%] px-24 mt-12 " >
                <h1 className='font-semibold text-3xl font-serif  '>{articleDetails.title}</h1>
                <p className='py-3 text-lg tracking-wide'> <span className='text-red-500 mb-12'>Published On</span> : {new Date(articleDetails.createdAt).toLocaleString()} By {articleDetails.author}</p>

            <img alt='' src={articleDetails.image} className='w-full mt-6'/>
                <p className='pt-8 text-xl tracking-wide leading-8'>{articleDetails.summary}</p>
               
            </div>
            
            <div className='pt-14 text-3xl pl-20'>
            {isLiked ? 
              <FaHeart onClick={handleLikeToggle} className='text-red-500 cursor-pointer' /> : 
              <FaRegHeart onClick={handleLikeToggle} className='cursor-pointer' />
            }
          </div>
           
    </div>
    
    <DefaultComponent articleId={articleDetails._id}/>
    </>
  )
}

export default ArticleDetails