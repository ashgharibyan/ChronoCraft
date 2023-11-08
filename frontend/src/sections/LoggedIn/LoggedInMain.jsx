import React from "react";
import TopBar from "./TopBar";
import Dashboard from "./Dashboard";

const LoggedInMain = () => {
	return (
		<div className="overflow:hidden h-screen ">
			<TopBar />
			<Dashboard />
		</div>
	);
};

export default LoggedInMain;
