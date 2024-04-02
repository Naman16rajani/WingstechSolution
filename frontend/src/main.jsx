import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import Blogs from './Pages/Blogs.jsx'
import ViewBlogs from './Pages/ViewBlog.jsx'
import NavBar from './components/NavBar.jsx'
import App from './App.jsx'
import './index.css'
import axios from 'axios'




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <BrowserRouter>
      <Routes path="/" Component={NavBar}>
        <Route index Component={App} />
        <Route path="login" Component={Login} />
        <Route path="register" Component={Register} />
        <Route path="blog" Component={Blogs} />
        <Route path="blog/view" Component={ViewBlogs} />
      </Routes>
    </BrowserRouter>

  </React.StrictMode>,
)
