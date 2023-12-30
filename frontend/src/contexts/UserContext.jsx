import React, { createContext, useState, useContext } from "react";
import { useGeneral } from "./GeneralContext";
import { useModel } from "./ModelContext";

// Create Context object.
export const UserContext = createContext();

// Create a provider component.
export const UserProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const {
		setTriggerSidebarRefresh,
		setTriggerSidebarFolderRefresh,
		setTriggerSidebarListRefresh,
	} = useGeneral();

	const {
		projects,
		setProjects,
		setSelectedProject,
		setFolders,
		setSelectedFolder,
		setLists,
		setSelectedList,
		setTasks,
		setSelectedTask,
	} = useModel();

	const logIn = () => setIsLoggedIn(true);
	const logOut = () => {
		setTriggerSidebarRefresh(true);
		setTriggerSidebarFolderRefresh(true);
		setTriggerSidebarListRefresh(true);
		setProjects([]);
		setSelectedProject("");
		setFolders([]);
		setSelectedFolder(null);
		setLists([]);
		setSelectedList("");
		setTasks([]);
		setSelectedTask("");
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
