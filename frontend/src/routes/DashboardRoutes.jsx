import { Route, Routes } from "react-router-dom";
import React from "react";
import NotFound from "../components/NotFound";
import Dashboard from "../sections/Dashboard/Dashboard";
const DashboardRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default DashboardRoutes;
