import React, { createContext, useState, useContext, useRef } from "react";

// Create Context object.
export const HomePageContext = createContext();

// Create a provider component.
export const HomePageProvider = ({ children }) => {
	const aboutRef = useRef();
	const featuresRef = useRef();
	const pricingRef = useRef();
	const contactRef = useRef();
	const testimonialsRef = useRef();
	const topPageRef = useRef();
	return (
		<HomePageContext.Provider
			value={{
				aboutRef,
				featuresRef,
				pricingRef,
				contactRef,
				testimonialsRef,
				topPageRef,
			}}
		>
			{children}
		</HomePageContext.Provider>
	);
};

// Custom hook to use the HomePageContext
export const useHomePage = () => {
	const context = useContext(HomePageContext);
	if (!context) {
		throw new Error("useHomePage must be used within a HomePageProvider");
	}
	return context;
};
