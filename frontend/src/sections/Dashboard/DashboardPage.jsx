import React from "react";
import SidebarComponent from "./SidebarComponent";
import Dashboard from "./Dashboard";

const DashboardPage = () => {
	return (
		<div className="flex overflow: hidden;">
			<SidebarComponent />
			<div className="w-full  ">
				<Dashboard />
			</div>
		</div>
	);
};

export default DashboardPage;
