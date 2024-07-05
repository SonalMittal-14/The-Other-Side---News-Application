import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LikedArticle = () => {
  const [likedArticles, setLikedArticles] = useState([]);

  console.log(likedArticles);
 

  // Function to truncate summary to a specified number of words
  const truncateSummary = (summary, maxWords) => {
    const words = summary.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return summary;
  };

  useEffect(() => {
    
    const fetchLikedArticles = async () => {
      const url = `${window.API_URL}/likedArticles`;
      const token = localStorage.getItem("token")
      const response = await axios.get(url , {
        headers : {
          Authorization : token
        }
      });
      console.log(response);
      if(response.status === 200){
        setLikedArticles(response.data.articles)
      }
    }

    fetchLikedArticles();
  } , [])

  return (
    <div>
      <h1 className='font-semibold text-3xl font-serif pl-12 pt-6'>Liked Articles</h1>
      <div className='flex gap-x-9 gap-y-2 justify-center items-center   mt-6'>
        {likedArticles.length > 0 ? (
          likedArticles.map(article => (
            <div key={article._id} className='border w-[700px] h-48 flex cursor-pointer border-gray-200 rounded-xl bg-gray-100'>
              
        <img
          src={article.image}
          className={`w-96 h-48`}
          alt=""
        />
        <div className="flex flex-col pt-4 pl-6 space-y-4">
  
          <h1 className="text-xl font-semibold"> {article.title}</h1>
          <div className="flex space-x-5">
            <h1>{article.author}</h1>
            <h1>{new Date(article.createdAt).toLocaleString()}</h1>
          </div>
        </div>
            </div>
          ))
        ) : (
          <p>No liked articles found.</p>
        )}
      </div>
    </div>
  );
};

export default LikedArticle;
