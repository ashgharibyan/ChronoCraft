import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { signupPage } from "../assets/index";

function getCookie(name) {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const RegisterPage = () => {
  const initialRegInfo = {
    name: "",
    username: "",
    email: "",
    password1: "",
    password2: "",
  };
  const [regInfo, setRegInfo] = useState(initialRegInfo);
  const [regErrors, setRegErrors] = useState([]);
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  useEffect(() => {
    setRegErrors([]);
    const jwtToken = localStorage.getItem("jwtToken");

    if (jwtToken) {
      axios.defaults.headers.common["Authorization"] = "JWT " + jwtToken;
      navigate("/dashboard");
    } else {
      axios.defaults.headers.common["Authorization"] = null;
    }
  }, []);

  const handleRegChange = (e) => {
    const { name, value } = e.target;
    setRegErrors([]);

    setRegInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const registerAxios = () => {
    console.log("REGISTERING DATA");
    // console.log(regInfo);
    const csrfToken = getCookie("csrftoken");

    axios
      .post("http://localhost:8000/api/dj-rest-auth/registration/", regInfo, {
        withCredentials: true,
        headers: {
          "X-CSRFToken": csrfToken,
        },
      })
      .then((res) => {
        console.log("SUCCESSSS");
        // console.log(res.data);
        localStorage.setItem("jwtToken", res.data.access);
        axios.defaults.headers.common["Authorization"] =
          "JWT " + res.data.access;
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log("ERRORRRR");
        console.log(err.response.data);

        const errors = Object.values(err.response.data).flat();
        setRegErrors(errors);

        axios.defaults.headers.common["Authorization"] = null;
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setRegErrors([]);
    let errors = [];

    if (regInfo.name === "") {
      errors.push("Name is required!");
    } else if (regInfo.name.length > 150) {
      errors.push("Name must be less than 150 characters!");
    }

    if (regInfo.username === "") {
      errors.push("Username is required!");
    } else if (regInfo.username.length > 150) {
      errors.push("Username must be less than 150 characters!");
    }

    if (regInfo.email === "") {
      errors.push("Email is required!");
    } else if (emailRegex.test(regInfo.email) === false) {
      errors.push("Email is invalid!");
    }

    if (regInfo.password1 === "") {
      errors.push("Password is required!");
    } else if (regInfo.password1.length < 8) {
      errors.push("Password must be at least 8 characters long!");
    } else if (regInfo.password2 === "") {
      errors.push("Confirm Password is required!");
    } else if (regInfo.password1 !== regInfo.password2) {
      errors.push("Passwords do not match!");
    }

    if (errors.length > 0) {
      setRegInfo(initialRegInfo);
      setRegErrors(errors);
      return;
    }

    registerAxios();
  };

  return (
    <div>
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        <div className="w-1/2 h-screen hidden lg:block">
          <img
            src={signupPage}
            alt="Signup Page"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <h1 className="text-2xl font-semibold mb-4">Sign Up!</h1>

          {/* Error Handling */}
          {regErrors.length > 0 ? (
            <div className=" mb-4 ">
              <div className="bg-red-50 border-l-8 border-red-900">
                <div className="flex items-center">
                  <div className="p-2">
                    <div className="px-8">
                      {regErrors.map((err, index) => (
                        <li
                          key={index}
                          className="font-bold text-red-500 text-sm "
                        >
                          {err}
                        </li>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          <form action="#" onSubmit={handleRegister}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                value={regInfo.name}
                onChange={handleRegChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-600">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                value={regInfo.username}
                onChange={handleRegChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                value={regInfo.email}
                onChange={handleRegChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password1" className="block text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password1"
                name="password1"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                value={regInfo.password1}
                onChange={handleRegChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password2" className="block text-gray-600">
                Confirm Password
              </label>
              <input
                type="password"
                id="password2"
                name="password2"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                value={regInfo.password2}
                onChange={handleRegChange}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-6 text-blue-500 text-center">
            <Link to="/login/" className="hover:underline">
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
