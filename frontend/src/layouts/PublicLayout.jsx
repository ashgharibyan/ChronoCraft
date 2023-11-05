import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const PublicLayout = ({ children }) => (
	<>
		<NavBar />
		<div>{children}</div>
		<Footer />
	</>
);

export default PublicLayout;
