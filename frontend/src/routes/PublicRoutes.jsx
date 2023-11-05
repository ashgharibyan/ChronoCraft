import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "../sections/Home";
import Products from "../components/Pages/Products";
import PasswordReset from "../components/LoginRegistration/PasswordReset";
import PasswordResetConfirm from "../components/LoginRegistration/PasswordResetConfirm";
import LoginPage from "../components/LoginRegistration/LoginPage";
import RegisterPage from "../components/LoginRegistration/RegisterPage";
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
