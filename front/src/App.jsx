import React from 'react'
import { useState,useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation  } from 'react-router-dom'
import axios from 'axios';

import { Navbar } from './components/Navbar/navbar'
import  Login  from './components/Login'
import  SignUp  from './components/SignUp'
import  Sidebar  from './components/Sidebar'
import  UserSettings  from './components/UserSettings'
import  BankAccounts  from './components/BankAccounts'
import  Transactions  from './components/Transactions'
import  TransactionDetail  from './components/TransactionDetail'


const App = () => {
 // const navigate = useNavigate();
  const [logged,setLogged] = useState(false)
  let isLogged = localStorage.getItem("logged");
  
  let location = useLocation();
  const[userData,setUserData]= useState({})

  useEffect( ()=>{										//compomnetDidUpdate
    // async function fetchData() { 
    // //let { data } = await axios.get("http://localhost:8081/api/v1/clients");
    // }
    // fetchData()
    
    function checkUserData() { }
    
    window.addEventListener('storage', checkUserData)
    if (isLogged==="true") {
      setLogged(true)
      let userLocalStore = JSON.parse(localStorage.getItem("user"));
      setUserData(userLocalStore)
     
    }
  },[isLogged])



  return (
    <div> 
    {!logged ? 
    (
      <>  
    <Routes>
      <Route path='/' element={<Login />} /> 
      <Route path='/signUp' element={<SignUp />} /> 
      <Route path="*" element={<h1 className="text-2xl mx-2">ERROR 401 - you must be logged to enter here</h1>} /> 
    </Routes>
    
      </> ) : (

    <div className='grid grid-rows-10 grid-flow-col gap-1'>  
        <div className="row-span-3 m-4">
          <Sidebar userdata={userData} />
        </div>
        <div className=" row-start-1 col-start-2 col-end-5 bg-[#046CD9]"> 
          <Navbar /> 
        </div>
        <div className=" row-start-2 row-end-10 col-start-2 col-end-5 bg-[#F0F0F0] ">
        <Routes>
           <Route path='/user/settings' element={<UserSettings />} /> 
           <Route path='/bankaccounts' element={<BankAccounts  />} /> 
           <Route path='/personal' element={<Transactions />} /> 
           <Route path='/transaction/:id' element={<TransactionDetail />} /> 
        </Routes>
        </div>
    </div>
 
    )}
    </div>
  )
}

export default App