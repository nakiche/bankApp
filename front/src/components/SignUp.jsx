import React from "react";
import { useState } from "react";
import validate from "./validate.js";
import axios from 'axios';
import { useNavigate,useLocation } from "react-router-dom";

export default function Form() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error,setError] = useState("")

  // console.log(location.pathname)

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    passwordConfirm: "",
  });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    passwordConfirm: "",
    //dataConsent: false,
  });

  let cleanState=()=>{
    setError('')
  }

  const handleSubmit = async () => {
    try {
      let { data } = await axios.post("/api/v1/clients", formData);
        if (data.userName){
          console.log(data);
          localStorage.setItem("logged","true");
          localStorage.setItem("user", JSON.stringify(data))
          setFormData({
            firstName: "",
            lastName: "",
            userName: "",
            password: "",
            passwordConfirm: "",
          });
          //e.target.reset();
          navigate("/user/settings");
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

    setErrors(
      validate({
        ...formData,
        [evento.target.name]: evento.target.value,
      })
    );
  };

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
            <span className="italic text-[#046CD9]">Real World App</span>  <br />Sign Up
          </h2>
          
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {error && ( <div className=" border bg-[#FFF5F5] text-[red] px-4 py-3 rounded relative text-center" role="alert">
             <span className="block sm:inline">{error}</span>
             </div>
             )

         }  
          <form
            className="space-y-6"
            id="signup_btn_submit"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(formData);

            
            }}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First Name*
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleInputChange}
                  placeholder="First Name*"
                />
              </div>
              <p style={{ fontSize: "15px", color: "red" }}>{errors.firstName}</p>
            </div>
            <div>
   
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleInputChange}
                  placeholder="Last Name*"
                />
              </div>
              <p style={{ fontSize: "15px", color: "red" }}>{errors.lastName}</p>
            </div>
            <div>
    
              <div className="mt-2">
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleInputChange}
                  placeholder="userName *"
                />
              </div>
              <p style={{ fontSize: "15px", color: "red" }}>{errors.userName}</p>
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
              <p style={{ fontSize: "15px", color: "red" }}>{errors.password}</p>
            </div>

            <div>
              <div className="mt-2">
                <input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleInputChange}
                  placeholder="Confirm Password *"
                />
              </div>
              <p style={{ fontSize: "15px", color: "red" }}>{errors.passwordConfirm}</p>
            </div>
            
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#046CD9] px-3 py-1.5 text-sm font-semibold leading-6 text-black
                   shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-30 text-[#fff]"
                disabled={
                  formData.firstName &&
                  formData.lastName &&
                  formData.userName &&
                  formData.password &&
                  formData.passwordConfirm
                    ? false
                    : true
                }
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
