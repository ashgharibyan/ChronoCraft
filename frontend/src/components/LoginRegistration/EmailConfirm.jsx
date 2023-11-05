import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function getCookie(name) {
	let value = "; " + document.cookie;
	let parts = value.split("; " + name + "=");
	if (parts.length === 2) return parts.pop().split(";").shift();
}

const EmailConfirm = () => {
	const { key } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const csrfToken = getCookie("csrftoken");

		// Call the API endpoint to confirm the email
		axios
			.post(
				`http://localhost:8000/api/v1/accounts/dj-rest-auth/registration/verify-email/`,
				{ key: key },
				{
					withCredentials: true,
					headers: {
						"X-CSRFToken": csrfToken,
					},
				}
			)
			.then((response) => {
				console.log(response);
				navigate("/account/confirmed");
			})
			.catch((error) => {
				console.log(error);
			});
	}, [key]);

	// Render confirmation status to the user
	return (
		<div>
			Confirming your email...
			{/* display success or error message */}
		</div>
	);
};

export default EmailConfirm;
