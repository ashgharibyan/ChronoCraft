import React, { createContext, useState, useContext } from "react";
import { useGeneral } from "./GeneralContext";

// Create Context object.
export const UserContext = createContext();

// Create a provider component.
export const UserProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [triggerSidebarRefresh, setTriggerSidebarRefresh] = useGeneral();

	const logIn = () => setIsLoggedIn(true);
	const logOut = () => {
		setTriggerSidebarRefresh(true);
		setIsLoggedIn(false);
	};

	return (
		<UserContext.Provider value={{ isLoggedIn, logIn, logOut }}>
			{children}
		</UserContext.Provider>
	);
};

// Custom hook to use the UserContext
export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};
