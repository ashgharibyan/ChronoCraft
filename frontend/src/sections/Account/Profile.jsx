import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ClockIcon } from "@heroicons/react/24/outline";
import { useUser } from "../../contexts/UserContext";
import { useGeneral } from "../../contexts/GeneralContext";
function getCookie(name) {
	let value = "; " + document.cookie;
	let parts = value.split("; " + name + "=");
	if (parts.length === 2) return parts.pop().split(";").shift();
}

const Profile = () => {
	const [user, setUser] = useState({});
	const navigate = useNavigate();
	const { logOut } = useUser();
	const [isEmailVerified, setIsEmailVerified] = useState(false);
	const [editToggle, setEditToggle] = useState(false);
	const [initialUserData, setInitialUserData] = useState({
		name: "",
		username: "",
		email: "",
	});
	const [userEditData, setUserEditData] = useState(initialUserData);
	const [editErrors, setEditErrors] = useState([]);
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

	const fetchUserData = async () => {
		const csrfToken = getCookie("csrftoken");

		try {
			const response = await axios.get(
				"http://localhost:8000/api/v1/accounts/dj-rest-auth/user/",
				{
					withCredentials: true,
					headers: {
						"X-CSRFToken": csrfToken,
					},
				}
			);
			console.log("Successfully fetched user data");
			console.log(response.data);
			setUser(response.data);
			setUserEditData({
				name: response.data.name,
				username: response.data.username,
				email: response.data.email,
			});
			setInitialUserData({
				name: response.data.name,
				username: response.data.username,
				email: response.data.email,
			});
		} catch (err) {
			if (err.response.status === 401) {
				try {
					const csrfToken = getCookie("csrftoken");

					const refreshResponse = await axios.post(
						"http://localhost:8000/api/v1/accounts/dj-rest-auth/token/refresh/",
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

	const isEmailVerifiedAxios = async () => {
		const csrfToken = getCookie("csrftoken");

		try {
			const response = await axios.post(
				"http://localhost:8000/api/v1/accounts/is-email-verified/",
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
						"http://localhost:8000/api/v1/accounts/dj-rest-auth/token/refresh/",
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

	useEffect(() => {
		const jwtToken = localStorage.getItem("jwtToken");

		if (jwtToken) {
			axios.defaults.headers.common["Authorization"] =
				"Bearer " + jwtToken;
			fetchUserData();
		} else {
			navigate("/login");
		}
	}, []);

	useEffect(() => {
		if (user.pk) {
			isEmailVerifiedAxios();
		}
	}, [user]);

	const logoutAxios = async () => {
		try {
			const csrfToken = getCookie("csrftoken");

			const response = await axios.post(
				"http://localhost:8000/api/v1/accounts/dj-rest-auth/logout/",
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
						"http://localhost:8000/api/v1/accounts/dj-rest-auth/token/refresh/",
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

	const handleEditDataChange = (e) => {
		e.preventDefault();
		setEditErrors([]);
		setUserEditData({
			...userEditData,
			[e.target.name]: e.target.value,
		});
	};

	const handleEditSubmit = (e) => {
		e.preventDefault();
		console.log(e.target);

		setEditErrors([]);
		let errors = [];

		if (userEditData.name === "") {
			errors.push("Name is required!");
		} else if (userEditData.name.length > 150) {
			errors.push("Name must be less than 150 characters!");
		}

		if (userEditData.username === "") {
			errors.push("Username is required!");
		} else if (userEditData.username.length > 150) {
			errors.push("Username must be less than 150 characters!");
		}

		if (userEditData.email === "") {
			errors.push("Email is required!");
		} else if (emailRegex.test(userEditData.email) === false) {
			errors.push("Email is invalid!");
		}

		if (errors.length > 0) {
			setEditErrors(errors);
			return;
		}

		//TODO AXIOS CALL TO EDIT USER DATA
	};

	return (
		<div className={`flex-grow flex flex-col overflow-scroll bg-stone-200`}>
			{/* EMAIL VERIFICATION */}
			{isEmailVerified ? (
				""
			) : (
				<div>
					<p className="text-lg text-center bg-red-500 text-white px-4 py-2 ">
						Your email is still not verified. Please check your
						inbox.
					</p>
				</div>
			)}
			{user.username ? (
				<div className="text-center flex-grow flex justify-center flex-col items-center ">
					<div className="flex justify-evenly items-center px-4 py-8">
						<button
							type="button"
							className="  px-4 py-2 font-bold  text-indigo-600 hover:text-indigo-900 focus:text-indigo-950 "
							onClick={() => {
								setEditErrors([]);
								setEditToggle(false);
								setUserEditData(initialUserData);
							}}
						>
							ABOUT
						</button>
						<button
							type="button"
							className="  px-4 py-2 font-bold text-indigo-600 hover:text-indigo-900 focus:text-indigo-950 "
							onClick={() => {
								setEditErrors([]);
								setEditToggle(true);
								setUserEditData(initialUserData);
							}}
						>
							EDIT PROFILE
						</button>
						<button
							type="button"
							className="  px-4 py-2 font-bold text-indigo-600 hover:text-indigo-900 focus:text-indigo-950 "
						>
							DELETE ACCOUNT
						</button>
						<Link
							to="/account/password/change/"
							className="px-4 py-2  font-bold text-indigo-600 hover:text-indigo-900 focus:text-indigo-950"
						>
							CHANGE PASSWORD
						</Link>
						<button
							onClick={handleLogout}
							className="px-4 py-2  font-bold text-indigo-600 hover:text-indigo-900 focus:text-indigo-950"
						>
							LOG OUT
						</button>
					</div>

					{user ? (
						editToggle ? (
							// Edit div
							<div className="flex flex-col justify-center items-center gap-4 py-4 m-6 px-20 border-[1px] border-indigo-600 rounded-lg min-w-fit ">
								{/* Error Handling */}
								{editErrors.length > 0 ? (
									<div className=" mb-4 ">
										<div className="bg-red-50 border-l-8 border-red-900">
											<div className="flex items-center">
												<div className="p-2">
													<div className="px-8">
														{editErrors.map(
															(err, index) => (
																<li
																	key={index}
																	className="font-bold text-red-500 text-sm "
																>
																	{err}
																</li>
															)
														)}
													</div>
												</div>
											</div>
										</div>
									</div>
								) : (
									""
								)}
								<form
									onSubmit={handleEditSubmit}
									className="flex flex-col justify-center items-center gap-8 "
								>
									<h1 className="uppercase bg-indigo-600 text-white p-2 px-6 rounded-lg font-bold text-3xl">
										Edit your profile
									</h1>
									<div className="flex flex-col items-center text-center">
										<img
											className="w-32 h-32 rounded-full p-2"
											src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
											alt=""
										/>
										<p className="text-center text-indigo-600">
											Change Profile Picture
										</p>
									</div>
									<div className="flex justify-center items-center gap-4 p-2">
										<label className="text-lg font-bold bg-white border-[1px] border-indigo-600 rounded-lg text-indigo-600 px-4 py-2">
											Name:
										</label>
										<input
											value={userEditData.name}
											name="name"
											className="text-lg bg-indigo-600 text-white px-4 py-2 rounded-lg"
											onChange={handleEditDataChange}
										/>
									</div>
									<div className="flex justify-center items-center gap-4 p-2">
										<label className="text-lg font-bold bg-white border-[1px] border-indigo-600 rounded-lg text-indigo-600 px-4 py-2">
											Username:
										</label>
										<input
											name="username"
											value={userEditData.username}
											className="text-lg bg-indigo-600 text-white px-4 py-2 rounded-lg"
											onChange={handleEditDataChange}
										/>
									</div>
									<div className="flex justify-center items-center gap-4 p-2">
										<label className="text-lg font-bold bg-white border-[1px] border-indigo-600 rounded-lg text-indigo-600 px-4 py-2">
											Email:
										</label>
										<input
											name="email"
											value={userEditData.email}
											className="text-lg bg-indigo-600 text-white px-4 py-2 rounded-lg min-w-full"
											onChange={handleEditDataChange}
										/>
									</div>
									<button
										type="submit"
										className=" bg-indigo-600 text-white p-2 px-6 rounded-lg font-bold text-lg"
									>
										Submit Changes
									</button>
								</form>
							</div>
						) : (
							// About Div
							<div className="flex flex-grow flex-col justify-center items-center gap-8 p-4 ">
								<img
									className="w-32 h-32 rounded-full p-2"
									src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
									alt=""
								/>

								<div className="flex justify-center items-center gap-4 p-2">
									<label className="text-lg font-bold bg-white border-[1px] border-indigo-600 rounded-lg text-indigo-600 px-4 py-2">
										Name:
									</label>
									<input
										value={user.name}
										className="text-lg bg-indigo-600 text-white px-4 py-2 rounded-lg"
										readOnly
									/>
								</div>
								<div className="flex justify-center items-center gap-4 p-2">
									<label className="text-lg font-bold bg-white border-[1px] border-indigo-600 rounded-lg text-indigo-600 px-4 py-2">
										Username:
									</label>
									<input
										value={user.username}
										className="text-lg bg-indigo-600 text-white px-4 py-2 rounded-lg"
										readOnly
									/>
								</div>
								<div className="flex justify-center items-center gap-4 p-2">
									<label className="text-lg font-bold bg-white border-[1px] border-indigo-600 rounded-lg text-indigo-600 px-4 py-2">
										Email:
									</label>
									<input
										value={user.email}
										className="text-lg bg-indigo-600 text-white px-4 py-2 rounded-lg min-w-full"
										readOnly
									/>
								</div>
							</div>
						)
					) : (
						""
					)}
				</div>
			) : (
				<div className="flex justify-center items-center w-screen h-screen">
					<ClockIcon className=" w-20 h-20 text-indigo-600 animate-spin" />
				</div>
			)}
		</div>
	);
};

export default Profile;