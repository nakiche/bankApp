import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import validate from "./validate.js";

export default function NewPayment() {
  const [accountExists, setAccountExists] = useState(false);
  const [errors, setErrors] = useState({
    accountNumber: "",
  });
  const [formData, setFormData] = useState({
    accountNumber: "",
    firstName: "",
    lastName: "",
    transferAmmount: "",
  });

  function Validate(inputs) {
    var errors = {};
    //email accountNumber
    if (!inputs.accountNumber) {
      errors.accountNumber = "Account number is required";
      setAccountExists(false);
    } else if (inputs.accountNumber.length < 25) {
      errors.accountNumber = "Account number must have 24 digits";
      setAccountExists(false);
    } else if (inputs.accountNumber.length > 25) {
      errors.accountNumber = "Account number must not have more than 24 digits";
      setAccountExists(false);
    } else if (inputs.transferAmmount.value < 1) {
      errors.accountNumber = "Must be 1€ or more";
    }
    return errors;
  }

  const handleClick = async () => {
    // setAccount(false);
  };

  const handleSearch = async () => {
    setFormData({
      ...formData,
      firstName: "",
      lastName: "",
    });
    try {
      let { data } = await axios.post(`/api/v1/clients/accounts`, {
        accountNumber: formData.accountNumber,
      });

      if (data.accountNumber) {
        console.log(data);
        setFormData({
          ...formData,
          firstName: data.firstName,
          lastName: data.lastName,
        });
        setAccountExists(true);
      }
    } catch (error) {
      setAccountExists(false);
      toast.error(error.response.data.message);
    }
  };

  const handleInputChange = async (evento) => {
    setFormData({
      ...formData,
      [evento.target.name]: evento.target.value, // Sintaxis ES6 para actualizar la key correspondiente
    });

    setErrors(
      Validate({
        ...formData,
        [evento.target.name]: evento.target.value,
      })
    );
  };

  const handleSubmit = async (event) => {
    try {
      // let { data } = await axios.post(`/api/v1/clients/accounts`, {
      //   accountNumber: formData.accountNumber,
      // });

      // if (data.accountNumber) {
      //   setFormData({
      //     ...formData,
      //     firstName: data.firstName,
      //     lastName: data.lastName,
      //     email: data.email,
      //   });
      // }
      setAccountExists(false);
      setFormData({
        accountNumber: "",
        firstName: "",
        lastName: "",
        transferAmmount: "",
      });
      event.target.reset();
      toast.success("transfer successfully done");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-[#F0F0F0] ">
        <div className="flex flex-row justify-start	">
          <div>
            <h3 className=" text-center text-2xl leading-9 tracking-tight text-gray-900">
              <span className=" text-[#046CD9]">Make a payment</span>
            </h3>
          </div>
        </div>
        <div className="flex flex-row justify-center	">
          <div className="mt-4 w-2/5  ">
            <form
              className="text-center"
              onSubmit={(e) => {
                handleSubmit(e);
                e.preventDefault();
              }}
            >
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="number"
                  id="default-search"
                  name="accountNumber"
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter contact name or account number..."
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    handleSearch(formData);
                    e.preventDefault();
                  }}
                  disabled={formData.accountNumber.length == 25 ? false : true}
                  className=" disabled:opacity-50 text-white absolute right-2.5 bottom-2.5 bg-[#046CD9] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
              <p style={{ fontSize: "15px", color: "red" }}>
                {errors.accountNumber}
              </p>

              {!accountExists || errors.accountNumber ? (
                <></>
              ) : (
                <>
                  <div className="flex flex-row justify-around	">
                    <div className="font-bold flex items-center w-auto mt-5">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentcolor"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                          />
                        </svg>
                      </span>
                      <span>{formData.firstName}&nbsp;</span>
                      <span>{formData.lastName}</span>
                    </div>
                  </div>

                  <div className="flex flex-row justify-center items-center	">
                    <input
                      name="transferAmmount"
                      type="number"
                      placeholder="0"
                      onChange={handleInputChange}
                      className={
                        "w-16 border-none bg-[#F0F0F0] text-3xl focus:ring-[#F0F0F0] text-right pr-1 " +
                        (formData.transferAmmount.length > 0
                          ? "font-bold"
                          : "font-light")
                      }
                      autoFocus
                    />
                    <span
                      className={
                        "text-2xl " +
                        (formData.transferAmmount.length > 0
                          ? "font-semibold"
                          : "font-light")
                      }
                    >
                      €
                    </span>
                  </div>

                  <div className="flex flex-row justify-center">
                    <button
                      type="submit"
                      className="mt-2  w-auto flex rounded-md bg-[#15CF3A] px-3 py-1.5 text-sm font-semibold leading-6 text-black
                    shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-30 text-[#fff]"
                      disabled={
                        formData.transferAmmount.length > 0 ? false : true
                      }
                      // onClick={(e) => {
                      //   handleSubmit();
                      //   e.preventDefault();
                      // }}
                    >
                      SEND MONEY
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
    {!accountExists || errors.accountNumber ? (
      <>               
        <div>
          <h3 className="mt-3 text-left text-2xl leading-9 tracking-tight text-gray-900">
            <span className=" text-[#046CD9]">Recents</span>
          </h3>
        </div>
        <div className="flex flex-row justify-around	">
          <div className="mt-5 font-bold flex items-center ">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentcolor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </span>
            <span>$firstName&nbsp;&nbsp;</span>
            <span>$lastName&nbsp;&nbsp;</span>
            <span>$accountNumber&nbsp; </span>
          </div>
          <div className="mt-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
      </> 
      ):(<></>)}
      </div>
    </>
  );
}
