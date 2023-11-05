import { Route, Routes } from "react-router-dom";
import React from "react";
import PasswordChange from "../components/Dashboard/Account/PasswordChange";
import NotFound from "../components/NotFound";
import EmailConfirm from "../components/LoginRegistration/EmailConfirm";
import ConfirmationSuccess from "../components/LoginRegistration/ConfirmationSuccess";

const AccountRoutes = () => {
	return (
		<Routes>
			<Route path="/password/change" element={<PasswordChange />} />
			<Route path="/confirm-email/:key" component={<EmailConfirm />} />
			<Route path="/confirmed" component={<ConfirmationSuccess />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default AccountRoutes;
