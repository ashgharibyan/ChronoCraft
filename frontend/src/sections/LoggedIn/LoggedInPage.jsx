import React, { useEffect } from "react";
import SidebarComponent from "./SidebarComponent";
import LoggedInMain from "./LoggedInMain";
import { useGeneral } from "../../contexts/GeneralContext";

const LoggedInPage = () => {
	const { toggleSidebar, setToggleSidebar, wasToggledManually } =
		useGeneral();
	useEffect(() => {
		const handleResize = () => {
			if (
				window.innerWidth <= 768 &&
				toggleSidebar &&
				!wasToggledManually
			) {
				setToggleSidebar(false);
			} else if (
				window.innerWidth > 768 &&
				!toggleSidebar &&
				!wasToggledManually
			) {
				setToggleSidebar(true);
			}
		};

		// Set the sidebar state based on the initial window width
		handleResize();

		// Add the event listener for window resize
		window.addEventListener("resize", handleResize);

		// Clean up the event listener when the component is unmounted
		return () => window.removeEventListener("resize", handleResize);
	}, [toggleSidebar, wasToggledManually]);
	return (
		<div className="flex overflow-hidden ">
			{toggleSidebar ? <SidebarComponent /> : ""}
			<div className="w-full  ">
				<LoggedInMain />
			</div>
		</div>
	);
};

export default LoggedInPage;
