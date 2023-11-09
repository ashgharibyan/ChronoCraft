import React from "react";
import TopBar from "./TopBar";
import Dashboard from "./Dashboard";

const LoggedInMain = () => {
	return (
		<div className="overflow:hidden flex flex-col h-screen overflow-x-scroll">
			<TopBar />
			<Dashboard />
		</div>
	);
};

export default LoggedInMain;
