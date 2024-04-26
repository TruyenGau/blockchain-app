import logo from './logo.svg';
import { Route, Routes, Router, BrowserRouter, Switch } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Products from './components/Products';
import Login from './components/Login';
import Signup from './components/Signup';
import Errorpage from './components/Errorpage';
import App1Dap from './components/App1Dap';
import { useState } from 'react';

function App() {
  
  return (
    <div className="App">  
    
    <>
    
  
      <Navbar />
      
    
      <Routes>  
      <Route exact path="/" element={<Home />} />
      
      <Route path="/products" element= {<App1Dap/>}></Route>
     
      <Route path="/signup" element= {<Signup/>}></Route>
      
      <Route path="/login" element= {<Login/>}></Route>
      
      <Route path="/contact" element= {<Contact/>}></Route>
      
      <Route path="/about" element= {<About/>}></Route>

      {/* <Route path="/" element= {<Login/>}></Route>
       */}
        
      <Route path="*" element={<Errorpage />} />
       
      </Routes>
      
      </>
    </div>
  );
}

export default App;
