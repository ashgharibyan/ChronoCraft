import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import React from "react";
import NotFound from "../components/NotFound";
const DashboardRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default DashboardRoutes;
