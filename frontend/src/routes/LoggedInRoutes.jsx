import { Route, Routes } from "react-router-dom";
import React from "react";
import NotFound from "../components/NotFound";
import LoggedInPage from "../sections/LoggedIn/LoggedInPage";
const DashboardRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<LoggedInPage />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default DashboardRoutes;
