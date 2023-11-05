import { Route, Routes } from "react-router-dom";
import React from "react";
import PasswordChange from "../components/Dashboard/Account/PasswordChange";
import NotFound from "../components/NotFound";
const AccountRoutes = () => {
	return (
		<Routes>
			<Route path="/password/change" element={<PasswordChange />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default AccountRoutes;
