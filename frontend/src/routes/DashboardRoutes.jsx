import { Route, Routes } from "react-router-dom";
import React from "react";
import NotFound from "../components/NotFound";
import DashboardPage from "../sections/Dashboard/DashboardPage";
const DashboardRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<DashboardPage />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default DashboardRoutes;
