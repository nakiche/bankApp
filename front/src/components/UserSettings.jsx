import React from "react";
import { useState, useEffect } from "react";
import validate from "./validateUserSettings.js";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Form() {
  let userLocalStorage = JSON.parse(localStorage.getItem("user"));

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [edited, setEdited] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    telephone: "",
  });

  const [formData, setFormData] = useState({
    firstName: userLocalStorage.lastName,
    lastName: userLocalStorage.lastName,
    email: userLocalStorage.email ? userLocalStorage.email : "",
    telephone: userLocalStorage.telephone ? userLocalStorage.telephone : "",
  });

  let cleanState = () => {
    setError("");
    setSuccess("");
  };

  useEffect(() => {
    //compomnetDidMount
    // setFormData({...FormData,
    //   firstName:userLocalStorage.firstName,
    //   lastName:userLocalStorage.lastName
    // })
    // function checkUserData() { }
    // window.addEventListener('storage', checkUserData)
    // if (isLogged==="true") {
    //   setLogged(true)
    //   let userLocalStore = JSON.parse(localStorage.getItem("user"));
    //   setUserData(userLocalStore)
    // }
  }, []);

  const handleSubmit = async () => {
    //console.log(formData);

    try {
      let { data } = await axios.put(
        `http://localhost:8081/api/v1/clients/${userLocalStorage.id}?email=${formData.email}&telephone=${formData.telephone}`
      );
      if (data.userName) {
        toast.success("User successfully updated");
        setEdited(false);
        localStorage.setItem("user", JSON.stringify(data));
        setTimeout(cleanState, 3000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setTimeout(cleanState, 3000);
    }

    // setFormData({

    //   email: "",
    //   telephone: ""
    // });
    // e.target.reset();

    // let form = {

    //   name: "Thomas",
    //   stock: 10,
    //   expiryDate: "2023-07-03",
    //   category: "Crazy"
    // }
    // let { data } = await axios.post("https://localhost:7079/api/Product", form);
    // console.log(data);
  };

  const handleInputChange = async (evento) => {
    setEdited(true);
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
      <div>
        <Toaster />
      </div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-[#F0F0F0] ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h3 className="mt-10 text-center text-2xl leading-9 tracking-tight text-gray-900">
            <span className=" text-[#046CD9]">User Settings</span>
          </h3>
        </div>
        <div className="flex flex-row mt-10 justify-around	">
          <div className="w-36">
            <img
              className="object-cover  h-48 w-96"
              src="/src/assets/bank.png"
              alt="peopleImage"
            ></img>
          </div>

          <div className="w-80 ">
            {error && (
              <div
                className=" border bg-[#FFF5F5] text-[red] px-4 py-1 rounded relative text-center"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            {success && (
              <div
                className=" border bg-[#F3FAF7] text-[green] px-4 py-1 rounded relative text-center"
                role="alert"
              >
                <span className="block sm:inline">{success}</span>
              </div>
            )}

            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(formData);
              }}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                ></label>
                <div className="mt-2">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={userLocalStorage.firstName}
                    readOnly
                  />
                </div>
                <p style={{ fontSize: "15px", color: "red" }}>{errors.name}</p>
              </div>
              <div>
                <div className="mt-2">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={userLocalStorage.lastName}
                    readOnly
                  />
                </div>
                <p style={{ fontSize: "15px", color: "red" }}>{errors.name}</p>
              </div>
              <div>
                <div className="mt-2 ">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={
                      !formData.email
                        ? "bg-[#FFF5F5] border border-[red] text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                        : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    }
                    onChange={handleInputChange}
                    value={formData.email && formData.email}
                    placeholder="Email *"
                  />
                </div>
                <p style={{ fontSize: "15px", color: "red" }}>{errors.email}</p>
              </div>

              <div>
                <div className="mt-2">
                  <input
                    id="telephone"
                    name="telephone"
                    type="number"
                    className={
                      !formData.telephone
                        ? "bg-[#FFF5F5] border border-[red] text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                        : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    }
                    onChange={handleInputChange}
                    value={formData.telephone && formData.telephone}
                    placeholder="Telephone *"
                  />
                </div>
                <p style={{ fontSize: "15px", color: "red" }}>
                  {errors.telephone}
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-[#046CD9] px-3 py-1.5 text-sm font-semibold leading-6 text-black
                   shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-30 text-[#fff]"
                  disabled={
                    formData.email && formData.telephone && edited
                      ? false
                      : true
                  }
                >
                  SAVE
                </button>
              </div>
            </form>

            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
