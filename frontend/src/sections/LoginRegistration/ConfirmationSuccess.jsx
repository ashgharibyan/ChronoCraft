import React from "react";
import { Link } from "react-router-dom";

const ConfirmationSuccess = () => {
	return (
		<div>
			<h1>Email Confirmed!</h1>
			<p>Your email has been successfully confirmed.</p>
			<p>
				Click <Link to="/login">here</Link> to log in.
			</p>
		</div>
	);
};

export default ConfirmationSuccess;
