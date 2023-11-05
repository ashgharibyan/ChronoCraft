import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EmailConfirm = () => {
	const { key } = useParams();

	useEffect(() => {
		// Call the API endpoint to confirm the email
		axios
			.post(`http://localhost:8000/api/v1/accounts/confirm-email/${key}/`)
			.then((response) => {
				// Handle the response, e.g. inform the user of success
			})
			.catch((error) => {
				// Handle the error, e.g. email confirmation failed
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
