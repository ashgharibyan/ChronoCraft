import React, { createContext, useState, useContext, useRef } from "react";

// Create Context object.
export const GeneralContext = createContext();

// Create a provider component.
export const GeneralProvider = ({ children }) => {
	const projectManagementRef = useRef();
	const taskManagementRef = useRef();
	const portfolioRef = useRef();
	const resourceRef = useRef();
	const businessRef = useRef();
	return (
		<GeneralContext.Provider
			value={{
				projectManagementRef,
				taskManagementRef,
				portfolioRef,
				resourceRef,
				businessRef,
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
