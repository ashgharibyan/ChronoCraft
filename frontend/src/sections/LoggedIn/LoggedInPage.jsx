import React from "react";
import SidebarComponent from "./SidebarComponent";
import LoggedInMain from "./LoggedInMain";

const LoggedInPage = () => {
	return (
		<div className="flex overflow: hidden;">
			<SidebarComponent />
			<div className="w-full  ">
				<LoggedInMain />
			</div>
		</div>
	);
};

export default LoggedInPage;
