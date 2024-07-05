import React from 'react';
import {Routes,Route} from "react-router-dom";
import Account from './Components/Account/Account';
import Navbar from './Components/NavBar/NavBar';
import UpdatePage from './Components/Account/UpdatePage/UpdatePage';
import ArticleForm from "./Components/ArticleForm/ArticleForm.jsx"
import ArticlePage from './Components/ArticlePage/ArticlePage';
import ArticleUpdateForm from './Components/ArticleUpdateForm/ArticleUpdateForm';
import ArticleDetails from './Components/ArticleDetails/ArticleDetails';
import MyArticle from './Components/MyArticle/MyArticle';
import LikedArticle from './Components/LikedArticle/LikedArticle';
import LoginPage from './Components/Account/LoginPage/LoginPage.jsx';
import RegistrationPage from './Components/Account/RegistrationPage/RegistrationPage.jsx';

const App = () => {
  return (
    <div>
      <div className=''>
      <Routes>
          <Route path='/' element={
              <>
                 <Navbar/>
                 <ArticlePage/>
              </>
          }/>

          <Route path='/updateuser/:id' element={<UpdatePage/>} />
          <Route path='/addArticle' element={<ArticleForm/>} />
          <Route path='/articleDetails/:id' element={<ArticleDetails/>} />
          <Route path='/updateArticle/:id' element={<ArticleUpdateForm/>} />
          <Route path='/myArticle' element={<MyArticle/>} />
        
          <Route path="/register" element={<RegistrationPage/>} />
          <Route path="/login" element={<LoginPage/>} />

          <Route path='/LikeArticle' element={<LikedArticle/>} />



      </Routes>
    </div>
    </div>
  )
}

export default App