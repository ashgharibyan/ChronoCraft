import React, { useEffect } from "react";
import SidebarComponent from "../sections/LoggedIn/SidebarComponent";
import TopBar from "../sections/LoggedIn/TopBar";
import { useGeneral } from "../contexts/GeneralContext";

const LoggedInLayout = ({ children }) => {
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
		<>
			<div className="flex overflow-hidden ">
				{toggleSidebar ? <SidebarComponent /> : ""}
				<div className="w-full overflow-x-scroll">
					<div className="overflow-hidden flex flex-col h-screen overflow-x-scroll">
						<TopBar />
						{children}
					</div>
				</div>
			</div>
		</>
	);
};

export default LoggedInLayout;
