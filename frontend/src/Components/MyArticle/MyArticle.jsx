import React, { useEffect, useState } from 'react';
import axios from "axios";
import Article2 from '../Article2/Article2';
const MyArticle = ({ hamburger }) => {
    const [myArticles, setMyArticles] = useState([]);
    
    console.log("myarticles" , myArticles);
    useEffect(() => {
      
      const fetchMyArticles = async () => {
        const token = localStorage.getItem("token");
        const url = `${window.API_URL}/myArticles`
        const response = await axios.get(url , {
          headers : {
            Authorization : token
          }
        })
        console.log(response);
            if(response.status === 200){
              setMyArticles(response.data.articles)
            }else{
              console.log("Technical Error!!!");
            }
          }
        
      

      fetchMyArticles();
    } , [])
   

    console.log(myArticles);
    useEffect(() => {
        const fetchMyArticles = async () => {
            try {
                const uri = `${window.API_URL}/myArticles`;
                const token = localStorage.getItem("token")
                const response = await axios.get(uri, {
                    headers : {
                      Authorization : token
                    }
                });

                if (response.status === 200) {
                    setMyArticles(response.data.articles);
                } 
            } catch (err) {
                console.error("An error occurred while fetching articles");
                console.error(err);
            } 
        };

        fetchMyArticles();
    }, []);

    
    return (
        <div className="overflow-y-scroll custom-scrollbar  flex flex-col  h-[677px]">
          <h1 className='text-5xl font-serif tracking-wide pt-5 pl-6'>My Articles</h1>
        <div
          className={
            hamburger ? `flex  justify-between items-center px-10` : `flex justify-between items-center px-5 pt-4`
          }>
          
          </div>
        <div className={hamburger? ` flex  flex-wrap pl-9 gap-x-2 py-6 gap-y-2 `: "grid grid-cols-3 gap-2 px-3 my-5 "}>
          
  
          {myArticles.length>0 ?
            myArticles.map((article, index) => (
              <Article2 hamburger={hamburger} key={index} article={article} />
            ))
            :
            <h1 className="text-3xl text-slate-900 tracking-wider font-serif">No articles found</h1>
          }
        </div>
      </div>
    );
};

export default MyArticle;

