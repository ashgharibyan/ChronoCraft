import { BrowserRouter, Route, Routes } from "react-router-dom";

import Users from "./components/Users";

import NotFound from "./components/NotFound";

import { HomePageProvider } from "./contexts/HomePageContext";
import { GeneralProvider } from "./contexts/GeneralContext";
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardRoutes from "./routes/DashboardRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import AccountLayout from "./layouts/AccountLayout";
import AccountRoutes from "./routes/AccountRoutes";

function App() {
	return (
		<BrowserRouter>
			<GeneralProvider>
				<HomePageProvider>
					<Routes>
						<Route
							path="/*"
							element={
								<PublicLayout>
									<PublicRoutes />
								</PublicLayout>
							}
						/>
						<Route
							path="/dashboard/*"
							element={
								<DashboardLayout>
									<DashboardRoutes />
								</DashboardLayout>
							}
						/>
						<Route
							path="/account/*"
							element={
								<AccountLayout>
									<AccountRoutes />
								</AccountLayout>
							}
						/>
						<Route path="*" element={<NotFound />}>
							"Not Found"
						</Route>
						<Route path="/users" element={<Users />} />
					</Routes>
				</HomePageProvider>
			</GeneralProvider>
		</BrowserRouter>
	);
}

export default App;
