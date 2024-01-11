import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ClockIcon } from "@heroicons/react/24/outline";
import { useUser } from "../../contexts/UserContext";
import { useGeneral } from "../../contexts/GeneralContext";
import {
	fetchUserData,
	getFolderByIdAxios,
	listProjectsAxios,
	listProjectsPromiseAxios,
} from "../../axios/ModelAxios";
import { VscAccount } from "react-icons/vsc";
import { GoProjectRoadmap } from "react-icons/go";
import ProjectCard from "./components/ProjectCard";

function getCookie(name) {
	let value = "; " + document.cookie;
	let parts = value.split("; " + name + "=");
	if (parts.length === 2) return parts.pop().split(";").shift();
}

const Dashboard = () => {
	const navigate = useNavigate();
	const { logOut } = useUser();
	const [isEmailVerified, setIsEmailVerified] = useState(false);
	const { user, setUser } = useGeneral();
	const [last3Projects, setLast3Projects] = useState([]);

	const isEmailVerifiedAxios = async () => {
		const csrfToken = getCookie("csrftoken");

		try {
			const response = await axios.post(
				"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/accounts/is-email-verified/",
				{ user_id: user.pk },
				{
					withCredentials: true,
					headers: {
						"X-CSRFToken": csrfToken,
					},
				}
			);

			console.log("Successfully got email verification status");
			setIsEmailVerified(response.data.verified);
		} catch (err) {
			if (err.response.status === 401) {
				try {
					const csrfToken = getCookie("csrftoken");

					const refreshResponse = await axios.post(
						"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/accounts/dj-rest-auth/token/refresh/",
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
					isEmailVerifiedAxios(); // retry fetching user data with the new token
				} catch (refreshErr) {
					console.log("Error refreshing token", refreshErr);
					navigate("/login");
				}
			} else {
				console.log("Error fetching email verification data", err);
			}
		}
	};

	// useEffect(() => {
	// 	if (user.pk) {
	// 		isEmailVerifiedAxios();
	// 	}
	// }, [user]);

	useEffect(() => {
		const fetchProjectsData = async () => {
			try {
				const projectsData = await listProjectsPromiseAxios(navigate);
				// Handle the folder data
				console.log(
					"-------------------- IN FETCH Projects Data - Dashboard.jsx"
				);
				console.log("project data", projectsData);
				let tempProjectsData = projectsData;
				if (tempProjectsData) {
					if (tempProjectsData?.length > 3) {
						tempProjectsData = tempProjectsData.slice(
							tempProjectsData.length - 3,
							tempProjectsData.length
						);
					} else {
						tempProjectsData = tempProjectsData.slice(
							0,
							tempProjectsData.length
						);
					}
					setLast3Projects(tempProjectsData);
				} else {
					setLast3Projects([]);
				}
			} catch (error) {
				// Handle any errors
				console.error(
					"Error fetching projects data in Dashboard.jsx useeffect 222:",
					error
				);
			}
		};

		// Call the function
		fetchProjectsData();
	}, []);

	const logoutAxios = async () => {
		try {
			const csrfToken = getCookie("csrftoken");

			const response = await axios.post(
				"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/accounts/dj-rest-auth/logout/",
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
						"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/accounts/dj-rest-auth/token/refresh/",
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
		logOut();
		logoutAxios();
	};

	return (
		<div
			className={`overflow-y-scroll min-h-full overflow-x-scroll bg-slate-50 w-full `}
		>
			{user && user.username ? (
				<div className="w-full p-4">
					<div className="text-center">
						<h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
							WELCOME TO YOUR DASHBOARD, {user.username}
						</h1>
						{/* <VscAccount className="h-20 w-20 text-indigo-500" />
													<GoProjectRoadmap className="h-20 w-20 text-indigo-500" /> */}
					</div>
					<div className="space-y-4 text-center ">
						<p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
							Check out your latest projects
						</p>
						<div className="flex flex-col items-center justify-evenly gap-4 ">
							{last3Projects &&
								last3Projects.map((project, idx) => {
									return (
										<ProjectCard
											key={idx}
											project={project}
										/>
									);
								})}
						</div>
					</div>
				</div>
			) : (
				<div className="flex justify-center items-center w-screen h-full">
					<ClockIcon className=" w-20 h-20 text-indigo-600 animate-spin" />
				</div>
			)}
		</div>
	);
};

export default Dashboard;
