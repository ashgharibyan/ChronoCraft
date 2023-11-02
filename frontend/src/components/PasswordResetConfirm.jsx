import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const PasswordResetConfirm = () => {
	const { uid, token } = useParams();
	const initialPasswordData = {
		new_password1: "",
		new_password2: "",
		uid: uid,
		token: token,
	};
	const navigate = useNavigate();
	const [passwordData, setPasswordData] = useState(initialPasswordData);
	const [passwordErrors, setPasswordErrors] = useState([]); // Backend validation errors for password fields

	useEffect(() => {
		const jwtToken = localStorage.getItem("jwtToken");

		if (jwtToken) {
			navigate("/dashboard");
		}
	}, []);

	const handlePasswordReset = (e) => {
		e.preventDefault();
		setPasswordErrors([]);

		if (passwordData.new_password1 !== passwordData.new_password2) {
			setPasswordErrors(["Passwords do not match!"]);
			return;
		}
		if (passwordData.new_password1 === "") {
			setPasswordErrors(["Password is required!"]);
			return;
		}
		if (passwordData.new_password2 === "") {
			setPasswordErrors(["Confirm Password is required!"]);
			return;
		}
		if (uid === "") {
			setPasswordErrors(["uid is required!"]);
			return;
		}
		if (token === "") {
			setPasswordErrors(["token is required!"]);
			return;
		}

		axios
			.post(
				"http://localhost:8000/api/v1/accounts/dj-rest-auth/password/reset/confirm/",
				passwordData,
				{ withCredentials: true }
			)
			.then((res) => {
				console.log("Successfully reset password");
				console.log(res);
				navigate("/login");
			})
			.catch((err) => {
				console.log("Error resetting password");
				console.log(err);
				setPasswordErrors([err.response?.data]);
			});
	};

	return (
		<div>
			<h1>Reset Password</h1>
			<form action="" onSubmit={handlePasswordReset}>
				<label htmlFor="password1"> Password: </label>
				<input
					type="password"
					name="password1"
					id="password1"
					value={passwordData.new_password1}
					onChange={(e) =>
						setPasswordData({
							...passwordData,
							new_password1: e.target.value,
						})
					}
				/>
				<label htmlFor="password2"> Confirm Password: </label>
				<input
					type="password"
					name="password2"
					id="password2"
					value={passwordData.new_password2}
					onChange={(e) =>
						setPasswordData({
							...passwordData,
							new_password2: e.target.value,
						})
					}
				/>
				<input type="submit" value="Reset Password" />
			</form>
			{passwordErrors
				? passwordErrors.map((err, index) => (
						<p key={index} style={{ color: "red" }}>
							{err}
						</p>
				  ))
				: ""}
		</div>
	);
};

export default PasswordResetConfirm;
