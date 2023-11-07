import React from "react";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";

const DashboardPage = () => {
	return (
		<div>
			<TopBar />
			<div className="flex">
				<Sidebar />
				<Dashboard />
			</div>
		</div>
	);
};

export default DashboardPage;
