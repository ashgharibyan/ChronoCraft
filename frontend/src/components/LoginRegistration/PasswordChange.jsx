import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { passwordChangePage } from "../../assets/index";

function getCookie(name) {
	let value = "; " + document.cookie;
	let parts = value.split("; " + name + "=");
	if (parts.length === 2) return parts.pop().split(";").shift();
}

const PasswordChange = () => {
	const initialPasswordData = {
		new_password1: "",
		new_password2: "",
	};
	const navigate = useNavigate();
	const [passwordData, setPasswordData] = useState(initialPasswordData);
	const [passwordErrors, setPasswordErrors] = useState([]);

	useEffect(() => {
		const jwtToken = localStorage.getItem("jwtToken");

		if (jwtToken) {
			axios.defaults.headers.common["Authorization"] =
				"Bearer " + jwtToken;
		} else {
			navigate("/login");
		}
	}, []);

	const handlePasswordChange = (e) => {
		e.preventDefault();

		setPasswordErrors([]);

		if (passwordData.new_password1 === "") {
			setPasswordErrors(["Password is required!"]);
			return;
		} else if (passwordData.new_password1.length < 8) {
			setPasswordErrors(["Password must be at least 8 characters!"]);
			return;
		}

		if (passwordData.new_password2 === "") {
			setPasswordErrors(["Confirm Password is required!"]);
			return;
		}

		if (passwordData.new_password1 !== passwordData.new_password2) {
			setPasswordErrors(["Passwords do not match!"]);
			return;
		}

		passwordChangeAxios();

		// const csrfToken = getCookie("csrftoken");
		// axios
		//   .post(
		//     "http://localhost:8000/api/v1/accounts/dj-rest-auth/password/change/",
		//     passwordData,
		//     {
		//       withCredentials: true,
		//       headers: {
		//         "X-CSRFToken": csrfToken,
		//       },
		//     }
		//   )
		//   .then((res) => {
		//     console.log("Successfully changed password");
		//     console.log(res);
		//     navigate("/");
		//   })
		//   .catch((err) => {
		//     console.log("Error changing password");
		//     console.log(err);
		//     setPasswordErrors([err.response?.data]);
		//   });
	};

	const passwordChangeAxios = async () => {
		const csrfToken = getCookie("csrftoken");

		try {
			const response = await axios.post(
				"http://localhost:8000/api/v1/accounts/dj-rest-auth/password/change/",
				passwordData,
				{
					withCredentials: true,
					headers: {
						"X-CSRFToken": csrfToken,
					},
				}
			);

			console.log("Successfully changed password");
			console.log(response);
			navigate("/");
		} catch (error) {
			if (error.response && error.response.status === 401) {
				// Try to refresh the token
				try {
					const refreshResponse = await axios.post(
						"http://localhost:8000/api/v1/accounts/dj-rest-auth/token/refresh/"
					);

					// Assuming the new token is in the access property (adjust as needed)
					const newAccessToken = refreshResponse.data.access;

					// Save the new token (you may want to save it in localStorage or wherever you store your token)
					localStorage.setItem("jwtToken", newAccessToken);
					axios.defaults.headers.common["Authorization"] =
						"Bearer " + newAccessToken;
					// Optionally, after successfully getting a new token, you can retry the password change request here.
					passwordChangeAxios();
				} catch (refreshError) {
					console.error("Error refreshing token");
					console.error(refreshError);
					setPasswordErrors([
						"Failed to refresh token. Please login again.",
					]);
				}
			} else {
				console.log("Error changing password");
				console.log(error);
				const errors = Object.values(error.response?.data).flat();
				setPasswordErrors(errors);
				// setPasswordErrors([error.response?.data]);
			}
		}
	};

	return (
		<div className="bg-gray-100 flex justify-center items-center h-screen">
			<div className="w-1/2 h-screen hidden lg:block">
				<img
					src={passwordChangePage}
					alt="Password Change Page"
					className="object-cover w-full h-full"
				/>
			</div>

			<div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
				<h1 className="text-2xl font-semibold mb-4">Change Password</h1>

				{/* Error Handling */}
				{passwordErrors.length > 0 ? (
					<div className=" mb-4 ">
						<div className="bg-red-50 border-l-8 border-red-900">
							<div className="flex items-center">
								<div className="p-2">
									<div className="px-8">
										{passwordErrors.map((err, index) => (
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

				<form action="#" onSubmit={handlePasswordChange}>
					<div className="mb-4">
						<label
							htmlFor="new_password1"
							className="block text-gray-600"
						>
							New Password
						</label>
						<input
							type="text"
							id="new_password1"
							name="new_password1"
							className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
							autoComplete="off"
							value={passwordData.new_password1}
							onChange={(e) =>
								setPasswordData({
									...passwordData,
									new_password1: e.target.value,
								})
							}
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="new_password2"
							className="block text-gray-600"
						>
							Confirm New Password
						</label>
						<input
							type="text"
							id="new_password2"
							name="new_password2"
							className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
							autoComplete="off"
							value={passwordData.new_password2}
							onChange={(e) =>
								setPasswordData({
									...passwordData,
									new_password2: e.target.value,
								})
							}
						/>
					</div>
					<button
						type="submit"
						className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
					>
						Change Password
					</button>
				</form>
				<div className="mb-6 mt-4 text-blue-500 flex justify-evenly text-center gap-5">
					<Link
						to="/dashboard"
						className="text-blue-500 hover:underline"
						// className="hover:bg-blue-600 bg-blue-500 text-white rounded-md py-2 px-4 w-full"
					>
						Go Back
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PasswordChange;
