import React, { createContext, useState, useContext, useRef } from "react";

// Create Context object.
export const GeneralContext = createContext();

// Create a provider component.
export const GeneralProvider = ({ children }) => {
	const [selectedProduct, setSelectedProduct] = useState("");

	return (
		<GeneralContext.Provider
			value={{
				selectedProduct,
				setSelectedProduct,
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
