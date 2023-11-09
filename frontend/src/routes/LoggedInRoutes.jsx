import { Route, Routes } from "react-router-dom";
import React from "react";
import NotFound from "../components/NotFound";
import Profile from "../sections/Account/Profile";
import Dashboard from "../sections/LoggedIn/Dashboard";
const LoggedInRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="/profile/" element={<Profile />} />

			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default LoggedInRoutes;
