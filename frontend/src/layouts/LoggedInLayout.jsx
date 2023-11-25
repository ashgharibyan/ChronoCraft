import React, { useEffect } from "react";
import SidebarComponent from "../sections/LoggedIn/SidebarComponent";
import TopBar from "../sections/LoggedIn/TopBar";
import { useGeneral } from "../contexts/GeneralContext";
import { fetchUserData } from "../axios/GeneralAxios";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoggedInLayout = ({ children }) => {
	const {
		toggleSidebar,
		setToggleSidebar,
		wasToggledManually,
		user,
		setUser,
	} = useGeneral();

	const navigate = useNavigate();

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

	useEffect(() => {
		const jwtToken = localStorage.getItem("jwtToken");

		if (jwtToken) {
			axios.defaults.headers.common["Authorization"] =
				"Bearer " + jwtToken;

			fetchUserData(setUser, navigate);
		} else {
			navigate("/login");
		}
	}, []);
	return (
		<>
			{/* <div className="flex overflow-hidden "> */}
			{user && (
				<div className="flex h-screen overflow-hidden">
					{toggleSidebar ? <SidebarComponent /> : ""}
					<div className="flex flex-col w-full flex-grow">
						<TopBar />
						<div className="flex-1 overflow-auto bg-green-500">
							{children}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default LoggedInLayout;
