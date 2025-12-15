
import React from 'react'
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Ats from './pages/Ats'
import Playground from './pages/Playground'
import Learn from './pages/Learn'
import Nav from './components/common/Nav'
import home from './assets/home-bg.jpg';
import Home from './pages/Home'
import MainContent from "./components/Learntxtnew/MainContent"
import Login from './components/common/Login'
import Signup from './components/common/Signup'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from './components/common/Footer'


const App = () => {
 

  return (
    <div  >
    <BrowserRouter>
     <Nav/>
     <ToastContainer position="top-right" autoClose={3000} />
    <Routes>
    
<Route path='/' element={<Home/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/sign' element={<Signup/>}/>
<Route path='/dashboard' element={<Dashboard/>}/>
<Route path='/ats' element={<Ats/>}/>
<Route path='/learn/:name' element={<MainContent/>}/>
<Route path='/playground' element={<Playground/>}/>
<Route path='/learn'  element={<Learn/>}>

</Route>

    </Routes>
    <Footer/>
    </BrowserRouter>
    </div>
  )
}

export default App