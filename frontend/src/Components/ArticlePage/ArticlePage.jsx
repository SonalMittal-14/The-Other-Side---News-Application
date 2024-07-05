import React , {useState , useEffect, useContext} from 'react'
import axios from 'axios';
import Article from '../Article/Article';
import { FiltersortContext } from '../context/FiltersortContext';
const ArticlePage = () => {
    const [article , setArticle] = useState([]);

    const { search, category } = useContext(FiltersortContext);
    const [sorting , setSorting] = useState("deafult");


    const filterArticles = article
    .filter((article) => {
      const matchesCategory =
        category === "all news" || article.category.toLowerCase() === category;
      const matchesSearch = article.title.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sorting === "title") {
        return a.title.localeCompare(b.title);
      } else if (sorting === "author") {
        return a.author.localeCompare(b.author);
      } else if (sorting === "date") {
        return new Date(b.date) - new Date(a.date);
      } else {
        return 0; 
      }
    });

    const handleSorting = (event) => {
        setSorting(event.target.value);
    
      }


    useEffect(() => {

      const fetchArticles = async () => {
        const url = `${window.API_URL}/getArticles`;

        const response = await axios.get(url);

        if(response.status === 500){
          alert(response.data.message)
        }

        if(response.status === 200){
          setArticle(response.data.articles || []);
        }

      }

      fetchArticles();
    } , [])

    const handleDelete = (deletedArticleId) => {
        setArticle(prevArticles => prevArticles.filter(article => article._id !== deletedArticleId));
      };

      
  return (
    <>
    <div className='flex items-center py-2 justify-between px-12'>
        <h1 className='text-3xl font-normal font-serif tracking-wide '> {category}</h1>
        <select onChange={handleSorting} name="" id="" className=' focus:outline-0 w-[30%] bg-black text-white rounded-lg px-2 py-2 my-4 cursor-pointer'>
            <option className='bg-black text-white rounded-lg px-2 py-2 cursor-pointer' value="title">Sort By : Title</option>
            <option className='bg-black text-white rounded-lg px-2 py-2 cursor-pointer' value="author">Sort By : Author</option>
            <option className='bg-black text-white rounded-lg px-2 py-2 cursor-pointer' value="date">Sort By : Date</option>
            <option className='bg-black text-white rounded-lg px-2 py-2 cursor-pointer' value="default">Default</option>
        
            </select>
    </div>
    
    <hr className="bg-black h-0.5 border border-black mx-12" /> 
    <div className='flex flex-wrap justify-center  gap-8 mx-10 my-10' >
        
        {filterArticles.length > 0 ? 
        filterArticles.map((article , index) => (
            <Article  key={index} article={article} handleDelete={handleDelete}/>
            ))
            :
            <div>No Article Found</div>
            }
        
    </div>
    </>
  )
}

export default ArticlePage