import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "../sections/Home/Home";
import Products from "../sections/Home/Products";
import PasswordReset from "../sections/LoginRegistration/PasswordReset";
import PasswordResetConfirm from "../sections/LoginRegistration/PasswordResetConfirm";
import LoginPage from "../sections/LoginRegistration/LoginPage";
import RegisterPage from "../sections/LoginRegistration/RegisterPage";
import NotFound from "../components/NotFound";
const PublicRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/products" element={<Products />} />
			<Route path="/password/reset" element={<PasswordReset />} />
			<Route
				path="/password/reset/confirm/:uid/:token"
				element={<PasswordResetConfirm />}
			/>
			<Route path="/login" element={<LoginPage />} />
			<Route path="/sign-up" element={<RegisterPage />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default PublicRoutes;
