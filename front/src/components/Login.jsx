import React from "react";
import { useState } from "react";
import validate from "./validate.js";
import axios from 'axios';
import { useNavigate,useLocation } from "react-router-dom";

export default function Form() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error,setError] = useState("")


  const username = 'solera@solera.com';
  const password = 'bootcamp2';

  let cleanState=()=>{
    setError('')
  }

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    dataConsent: false,
  });
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const handleSubmit = async () => {
    // if (formData.password === password && formData.username === username) {
    //     localStorage.setItem("logged","true");
    //     navigate("/user/settings"); 
    //  }else{
    //    
    //  }
    try {
    let  {data}  = await axios.post("http://localhost:8081/api/v1/clients/login", formData);
    if (data.userName){
          localStorage.setItem("logged","true");
          localStorage.setItem("user", JSON.stringify(data))
        
          setFormData({
            userName: "",
            password: "",
          });
          navigate("/user/settings"); 
         // e.target.reset();
        }
    } catch (error) { 
      setError(error.response.data.message)
      setTimeout(cleanState, 3000);
    }



  };

  const handleInputChange = async (evento) => {

    // let { data } = await axios.get("http://localhost:8080/api/v1/student");
    // console.log(data);
  setFormData({
    ...formData,
    [evento.target.name]: evento.target.value, // Sintaxis ES6 para actualizar la key correspondiente
  });

    }
   

  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            <span className="italic text-[#046CD9]">Real World App</span>  <br />Sign in
          </h2>
          
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-center">
        {error && ( <div className=" border bg-[#FFF5F5] text-[red] px-4 py-3 rounded relative" role="alert">
             <span className="block sm:inline">{error}</span>
            
        </div>
        )
        
        }   
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(formData);

             
            }}
          >
  
            <div>
    
              <div className="mt-2">
                <input
                  id="username"
                  name="userName"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleInputChange}
                  placeholder="Username *"
                />
              </div>
              <p style={{ fontSize: "15px", color: "red" }}>{errors.email}</p>
            </div>

            <div>

              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleInputChange}
                  placeholder="Password *"
                />
              </div>
              <p style={{ fontSize: "15px", color: "red" }}>{errors.age}</p>
            </div>

           
            <div className="flex justify-between ">
              <button
                id="btn_login_submit"
                type="submit"
                className="m-1 flex w-full justify-center rounded-md bg-[#046CD9] px-3 py-1.5 text-sm font-semibold leading-6 text-black
                   shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-30 text-[#fff]"
                disabled={
               
                  formData.userName &&
                  formData.password 
                    ? false
                    : true
                }
              >
                LOG IN
              </button>
              <button
                id="btn_login_signup"
                type="submit"
                className=" m-1 flex w-full justify-center rounded-md bg-[#15CF3A] px-3 py-1.5 text-sm font-semibold leading-6 text-black
                   shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-30 text-[#fff]"
                onClick={ ()=> {navigate("/signup");} }
              >
                SING UP
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
