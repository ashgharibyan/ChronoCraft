import React, { createContext, useState, useContext, useRef } from "react";

// Create Context object.
export const GeneralContext = createContext();

// Create a provider component.
export const GeneralProvider = ({ children }) => {
	const [selectedProduct, setSelectedProduct] = useState("");
	const [toggleSidebar, setToggleSidebar] = useState(true);
	const [wasToggledManually, setWasToggledManually] = useState(false);

	return (
		<GeneralContext.Provider
			value={{
				selectedProduct,
				setSelectedProduct,
				toggleSidebar,
				setToggleSidebar,
				wasToggledManually,
				setWasToggledManually,
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
