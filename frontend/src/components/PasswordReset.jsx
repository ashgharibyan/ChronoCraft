import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

const PasswordReset = () => {
  // const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailErrors, setEmailErrors] = useState([]); // Backend validation errors for email field
  const [success, setSuccess] = useState(false); // Whether or not the email was successfully sent
  const navigate = useNavigate();
  useEffect(() => {
    setEmailErrors([]);
    const jwtToken = localStorage.getItem("jwtToken");

    if (jwtToken) {
      navigate("/dashboard");
    }
  }, []);

  const axiosCall = () => {
    axios
      .post(
        "http://localhost:8000/api/dj-rest-auth/password/reset/",
        { email: email },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("Successfully sent email for pasword reset");
        console.log(res);
        setSuccess(true);
      })
      .catch((err) => {
        console.log("Error sending email for password reset");
        console.log(err);
        setEmailErrors(err.response?.data?.email);
      });
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    setEmailErrors([]);
    console.log("Password Reset form submitted");
    console.log(email);
    if (email === "") {
      setEmailErrors(["Email is required!"]);
      return;
    }
    axiosCall();
  };

  return success ? (
    <main className="flex justify-center w-screen h-screen items-center  bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-lg text-gray-900 ">
          Password reset link has been emailed.
        </h1>

        <p className="mt-6 text-lg leading-7 text-gray-600">
          Check your inbox!
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/login"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Login
          </Link>

          <Link to="/" className="text-sm font-semibold text-gray-900">
            Home <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  ) : (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>

        {/* Error Handling */}
        {emailErrors.length > 0 ? (
          <div className=" mb-4 ">
            <div className="bg-red-50 border-l-8 border-red-900">
              <div className="flex items-center">
                <div className="p-2">
                  <div className="px-8">
                    {emailErrors.map((err, index) => (
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

        <form action="#" onSubmit={handlePasswordReset}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Reset Password
          </button>
        </form>
        <div className="mb-6 mt-4 text-blue-500 flex justify-evenly text-center gap-5">
          <Link
            to="/login"
            className="text-blue-500 hover:underline"
            // className="hover:bg-blue-600 bg-blue-500 text-white rounded-md py-2 px-4 w-full"
          >
            Login
          </Link>
          <Link to="/sign-up" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
