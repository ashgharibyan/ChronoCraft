import { Route, Routes } from "react-router-dom";
import React from "react";
import PasswordChange from "../sections/Account/PasswordChange";
import EmailConfirm from "../sections/LoginRegistration/EmailConfirm";
import NotFound from "../components/NotFound";
import ConfirmationSuccess from "../sections/LoginRegistration/ConfirmationSuccess";

const AccountRoutes = () => {
	return (
		<Routes>
			<Route path="/password/change" element={<PasswordChange />} />
			<Route path="/confirm-email/:key" element={<EmailConfirm />} />
			<Route path="/confirmed" element={<ConfirmationSuccess />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default AccountRoutes;
