import React, { useEffect } from "react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import axios from "axios";

export default function Form({}) {
  const [accounts, setAccounts] = useState("");
  let userLocalStore = JSON.parse(localStorage.getItem("user"));

  const [deleteData, setDeleteData] = useState({
    id: "",
    accountNumber: "",
  });
  //console.log(userLocalStore)
  let userAccounts = [];

  userLocalStore.accountOwners &&
    userLocalStore.accountOwners.length > 0 &&
    userLocalStore.accountOwners.map((c) => userAccounts.push(c));

  useEffect(() => {
    setAccounts(userAccounts);
  }, []);

  const [addAccount, setAddAccount] = useState(false);
  const [errors, setErrors] = useState({
    accountNumber: "",
  });
  const [formData, setFormData] = useState({
    accountNumber: "",
    firstName: "",
    lastName: "",
  });

  function Validate(inputs) {
    var errors = {};
    //email accountNumber
    if (!inputs.accountNumber) {
      errors.accountNumber = "Account number is required";
    } else if (inputs.accountNumber.length < 25) {
      errors.accountNumber = "Account number must have 24 digits";
    } else if (inputs.accountNumber.length > 25) {
      errors.accountNumber = "Account number must not have more than 24 digits";
    }
    return errors;
  }

  const handleSubmit = async () => {
    try {
      let { data } = await axios.post(`/api/v1/clients/accounts`, {
        accountNumber: formData.accountNumber,
      });
      console.log(data)

      if (data.accountNumber) {
        setFormData({
          ...formData,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleCreateContact = async () => {
    try {
      let {data} = await axios.post(
        `/api/v1/clients/accounts/${userLocalStore.id}`,
        {
          accountNumber: formData.accountNumber,
        }
      );
      console.log(data);
      toast.success("Account added succesfully");

      setFormData({
        accountNumber: "",
        firstName: "",
        lastName: "",
        email: "",
      });
    } catch (error) {
      toast.error(error.response.data.message);
      setFormData({
        accountNumber: "",
        firstName: "",
        lastName: "",
        email: "",
      });
    }
    setAddAccount(false);
    try {
      let { data } = await axios.get(`/api/v1/clients/${userLocalStore.id}`);
      if (data.firstName) {
        localStorage.setItem("user", JSON.stringify(data));
        setAccounts(data.accountOwners);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleCreate = async () => {
    !addAccount ? setAddAccount(true) : setAddAccount(false);
  };

  const handleDelete = async (account) => {
    console.log(account);
    //delete account
    try {
      let { data } = await axios.delete(
        `/api/v1/clients/accounts`,
        { data: account }
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
    //retrieve accounts
    try {
      let { data } = await axios.get(`/api/v1/clients/${userLocalStore.id}`);
      console.log(data);
      if (data.firstName) {
        localStorage.setItem("user", JSON.stringify(data));
        setAccounts(data.accountOwners);
      }
    } catch (error) {
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

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-[#F0F0F0] ">
        <div className="flex flex-row justify-around">
          <div>
            <h3 className=" text-center text-2xl leading-9 tracking-tight text-gray-900">
              <span className=" text-[#046CD9]">Bank Accounts</span>
            </h3>
          </div>
        {!addAccount &&  
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#046CD9] px-3 py-1.5 text-sm font-semibold leading-6 text-black
                            shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-30 text-[#fff]"
              onClick={handleCreate}
              disabled={addAccount ? true : false}
              >
              ADD NEW
            </button>
          </div>
          }
        </div>

          

        {addAccount && (
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="mt-2 ">
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  handleSubmit(formData);
                  e.preventDefault();
                }}
              >
                <div>
                  <div className="mt-2">
                    <input
                      id="accountNumber"
                      name="accountNumber"
                      type="number"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleInputChange}
                      placeholder="Bank account *"
                      readOnly={formData.firstName && "readOnly"}
                    />
                  </div>
                  <p style={{ fontSize: "15px", color: "red" }}>
                    {errors.accountNumber}
                  </p>
                </div>
                {formData.firstName && (
                  <div>
                    <div>
                      <div className="mt-2">
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          readOnly
                          value={formData.firstName}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="mt-2">
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          readOnly
                          value={formData.lastName}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {!formData.firstName && (
                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-[#046CD9] px-3 py-1.5 text-sm font-semibold leading-6 text-black
                    shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-30 text-[#fff]"
                      disabled={
                        formData.accountNumber.length == 25 ? false : true
                      }
                    >
                      SEARCH
                    </button>
                  </div>
                )}
                {formData.firstName && (
                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-[#15CF3A] px-3 py-1.5 text-sm font-semibold leading-6 text-black
                    shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-30 text-[#fff]"
                      disabled={formData.firstName ? false : true}
                      onClick={(e) => {
                        handleCreateContact(formData);
                        e.preventDefault();
                      }}
                    >
                      SAVE CONTACT
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}

        {accounts &&
          accounts.map((c, b) => (
            <div className="flex flex-row mt-10 justify-around  " key={b}>
              <div className="font-bold flex items-center w-36">
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
                <span>{c.firstName}&nbsp;&nbsp;</span>
                <span>{c.lastName}&nbsp;&nbsp;</span>
                <span>{c.accountNumber}&nbsp; </span>
                <span>
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
                      d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                    />
                  </svg>
                </span>
              </div>
              <div>
                <button
                  type="button"
                  className="flex w-full justify-center rounded-md bg-[#FA634E] px-3 py-1.5 text-sm font-semibold leading-6 text-black
                    shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-30 text-[white]"
                  onClick={() => {
                    handleDelete({
                      id: c.id,
                      accountNumber: c.accountNumber,
                    });
                  }}
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
