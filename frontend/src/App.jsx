import { BrowserRouter, Route, Routes } from "react-router-dom";

import Users from "./components/Users";

import NotFound from "./components/NotFound";

import { HomePageProvider } from "./contexts/HomePageContext";
import { GeneralProvider } from "./contexts/GeneralContext";
import PublicLayout from "./layouts/PublicLayout";
import LoggedInLayout from "./layouts/LoggedInLayout";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import AccountLayout from "./layouts/AccountLayout";
import AccountRoutes from "./routes/AccountRoutes";
import { ModelProvider } from "./contexts/ModelContext";
import { UserProvider } from "./contexts/UserContext";

function App() {
	return (
		<BrowserRouter>
			<GeneralProvider>
				<ModelProvider>
					<UserProvider>
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
										<LoggedInLayout>
											<LoggedInRoutes />
										</LoggedInLayout>
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
					</UserProvider>
				</ModelProvider>
			</GeneralProvider>
		</BrowserRouter>
	);
}

export default App;
