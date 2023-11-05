import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./sections/Home";
import PasswordReset from "./components/LoginRegistration/PasswordReset";
import PasswordResetConfirm from "./components/LoginRegistration/PasswordResetConfirm";
import LoginPage from "./components/LoginRegistration/LoginPage";
import RegisterPage from "./components/LoginRegistration/RegisterPage";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users";
import PasswordChange from "./components/LoginRegistration/PasswordChange";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";
import Products from "./components/Pages/Products";
import { HomePageProvider } from "./contexts/HomePageContext";
import { GeneralProvider } from "./contexts/GeneralContext";

function App() {
	return (
		<BrowserRouter>
			<GeneralProvider>
				<HomePageProvider>
					<NavBar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/products" element={<Products />} />
						<Route
							path="/password/reset"
							element={<PasswordReset />}
						/>
						<Route
							path="/password/reset/confirm/:uid/:token"
							element={<PasswordResetConfirm />}
						/>
						<Route
							path="/password/change"
							element={<PasswordChange />}
						/>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/sign-up" element={<RegisterPage />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="*" element={<NotFound />}>
							"Not Found"
						</Route>
						<Route path="/users" element={<Users />} />
					</Routes>
					<Footer />
				</HomePageProvider>
			</GeneralProvider>
		</BrowserRouter>
	);
}

export default App;
