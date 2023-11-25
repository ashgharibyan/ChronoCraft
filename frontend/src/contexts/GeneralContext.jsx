import React, { createContext, useState, useContext, useRef } from "react";

// Create Context object.
export const GeneralContext = createContext();

// Create a provider component.
export const GeneralProvider = ({ children }) => {
	const [selectedProduct, setSelectedProduct] = useState("");
	const [toggleSidebar, setToggleSidebar] = useState(true);
	const [wasToggledManually, setWasToggledManually] = useState(false);
	const [toggleProfile, setToggleProfile] = useState(false);
	const [user, setUser] = useState({});
	const [projects, setProjects] = useState([]);
	const [projectArrowClicked, setProjectArrowClicked] = useState(false);
	const [folderArrowClicked, setFolderArrowClicked] = useState(false);
	const [triggerSidebarRefresh, setTriggerSidebarRefresh] = useState(true);
	return (
		<GeneralContext.Provider
			value={{
				selectedProduct,
				setSelectedProduct,
				toggleSidebar,
				setToggleSidebar,
				wasToggledManually,
				setWasToggledManually,
				toggleProfile,
				setToggleProfile,
				user,
				setUser,
				projects,
				setProjects,
				projectArrowClicked,
				setProjectArrowClicked,
				folderArrowClicked,
				setFolderArrowClicked,
				triggerSidebarRefresh,
				setTriggerSidebarRefresh,
			}}
		>
			{children}
		</GeneralContext.Provider>
	);
};

// Custom hook to use the GeneralContext
export const useGeneral = () => {
	const context = useContext(GeneralContext);
	if (!context) {
		throw new Error("useGeneral must be used within a GeneralProvider");
	}
	return context;
};
