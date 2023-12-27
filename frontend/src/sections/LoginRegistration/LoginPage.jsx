import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { loginPage } from "../../assets/index";

function getCookie(name) {
	let value = "; " + document.cookie;
	let parts = value.split("; " + name + "=");
	if (parts.length === 2) return parts.pop().split(";").shift();
}

const LoginPage = () => {
	const initialLoginInfo = { username: "", password: "" };
	const [loginInfo, setLoginInfo] = useState(initialLoginInfo);
	const [loginErrors, setLoginErrors] = useState([]);
	const { isLoggedIn, logIn, logOut } = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		setLoginErrors([]);
		const jwtToken = localStorage.getItem("jwtToken");

		if (jwtToken) {
			axios.defaults.headers.common["Authorization"] = "JWT " + jwtToken;
			navigate("/dashboard");
		} else {
			axios.defaults.headers.common["Authorization"] = null;
		}
	}, []);

	const handleLoginChange = (e) => {
		const { name, value } = e.target;
		setLoginInfo((prevState) => ({ ...prevState, [name]: value }));
		setLoginErrors([]);
	};

	const loginAxios = () => {
		const csrfToken = getCookie("csrftoken");

		axios
			.post(
				"http://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/accounts/dj-rest-auth/login/",
				loginInfo,
				{
					withCredentials: true,
					headers: {
						"X-CSRFToken": csrfToken,
					},
				}
			)
			.then((res) => {
				console.log("SUCCESSSS");
				// console.log(res.data);
				localStorage.setItem("jwtToken", res.data.access);
				axios.defaults.headers.common["Authorization"] =
					"JWT " + res.data.access;

				logIn();
				navigate("/dashboard");
			})
			.catch((err) => {
				console.log("ERRORRRR");
				// console.log(err.response.data);
				axios.defaults.headers.common["Authorization"] = null;

				if (
					err.response.data.non_field_errors &&
					err.response.data.non_field_errors.length > 0
				) {
					setLoginErrors([
						"Invalid username or password. Please try again!",
					]);
					setLoginInfo(initialLoginInfo);
				}
			});
	};

	const handleLogin = (e) => {
		e.preventDefault();
		setLoginErrors([]);
		let errors = [];

		// Validate the form
		// Validate the username
		if (loginInfo.username === "") {
			errors.push("Username is required.");
		} else if (loginInfo.username.length > 150) {
			errors.push("Username must be less than 150 characters.");
		}

		// Validate the password
		if (loginInfo.password === "") {
			errors.push("Password is required.");
		} else if (loginInfo.password.length < 8) {
			errors.push("Password must be at least 8 characters.");
		}

		// If there are any errors, don't submit the form
		if (errors.length > 0) {
			setLoginInfo(initialLoginInfo);
			setLoginErrors(errors);
			return;
		}

		loginAxios();
	};

	return (
		<div>
			<div className="bg-gray-100 flex justify-center items-center h-screen">
				<div className="w-1/2 h-screen hidden lg:block">
					<img
						src={loginPage}
						alt="Login Page "
						className="object-cover w-full h-full"
					/>
				</div>

				<div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
					<h1 className="text-2xl font-semibold mb-4">Login</h1>

					{/* Error Handling */}
					{loginErrors.length > 0 ? (
						<div className=" mb-4 ">
							<div className="bg-red-50 border-l-8 border-red-900">
								<div className="flex items-center">
									<div className="p-2">
										<div className="px-8">
											{loginErrors.map((err, index) => (
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

					<form action="#" onSubmit={handleLogin}>
						<div className="mb-4">
							<label
								htmlFor="username"
								className="block text-gray-600"
							>
								Username
							</label>
							<input
								type="text"
								id="username"
								name="username"
								className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
								autoComplete="off"
								value={loginInfo.username}
								onChange={handleLoginChange}
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="password"
								className="block text-gray-600"
							>
								Password
							</label>
							<input
								type="password"
								id="password"
								name="password"
								className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
								autoComplete="off"
								value={loginInfo.password}
								onChange={handleLoginChange}
							/>
						</div>

						{/* <div className="mb-4 flex items-center">
							<input
								type="checkbox"
								id="remember"
								name="remember"
								className="text-blue-500"
							/>
							<label htmlFor="remember" className="text-gray-600 ml-2">
								Remember Me
							</label>
						</div> */}
						<div className="mb-6 text-blue-500">
							<Link
								to="/password/reset/"
								className="hover:underline"
							>
								Forgot Password?
							</Link>
						</div>
						<button
							type="submit"
							className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
						>
							Login
						</button>
					</form>
					<div className="mt-6 text-blue-500 text-center">
						<Link to="/sign-up" className="hover:underline">
							Sign Up Here
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
