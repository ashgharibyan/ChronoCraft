import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useUser } from "../contexts/UserContext";

function getCookie(name) {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const Dashboard = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoggedIn, logIn, logOut } = useUser();

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/dj-rest-auth/user/",
        { withCredentials: true }
      );
      setUser(response.data);
    } catch (err) {
      if (err.response.status === 401) {
        try {
          const csrfToken = getCookie("csrftoken");

          const refreshResponse = await axios.post(
            "http://localhost:8000/api/dj-rest-auth/token/refresh/",
            {},
            {
              withCredentials: true,
              headers: {
                "X-CSRFToken": csrfToken,
              },
            }
          );
          const newAccessToken = refreshResponse.data.access;
          localStorage.setItem("jwtToken", newAccessToken);
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + newAccessToken;
          fetchUserData(); // retry fetching user data with the new token
        } catch (refreshErr) {
          console.log("Error refreshing token", refreshErr);
          navigate("/login");
        }
      } else {
        console.log("Error fetching user data", err);
      }
    }
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");

    if (jwtToken) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + jwtToken;
      fetchUserData();
    } else {
      navigate("/login");
    }
  }, []);

  const logoutAxios = async () => {
    try {
      const csrfToken = getCookie("csrftoken");

      const response = await axios.post(
        "http://localhost:8000/api/dj-rest-auth/logout/",
        {},
        {
          withCredentials: true,
          headers: {
            "X-CSRFToken": csrfToken,
          },
        }
      );

      console.log("Successfully logged out");
      localStorage.removeItem("jwtToken");
      axios.defaults.headers.common["Authorization"] = null;
      // logOut();
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          const csrfToken = getCookie("csrftoken");

          const refreshResponse = await axios.post(
            "http://localhost:8000/api/dj-rest-auth/token/refresh/",
            {},
            {
              withCredentials: true,
              headers: {
                "X-CSRFToken": csrfToken,
              },
            }
          );
          const newAccessToken = refreshResponse.data.access;
          localStorage.setItem("jwtToken", newAccessToken);
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + newAccessToken;
          logoutAxios(); // retry fetching user data with the new token
        } catch (refreshErr) {
          console.log("Error refreshing token", refreshErr);
          navigate("/login");
        }
      } else {
        console.log("Error logging out", err);
      }
    }
  };

  const handleLogout = () => {
    logoutAxios();
    logOut();
  };

  return (
    <div>
      {user.username ? (
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Hello, {user.username}
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                fugiat aliqua.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="/password/change/"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Change Password
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Log Out <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>
      ) : (
        "Loding..."
      )}
    </div>
  );
};

export default Dashboard;
