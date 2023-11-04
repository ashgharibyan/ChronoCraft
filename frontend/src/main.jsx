import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./contexts/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<UserProvider>
			<div className="flex flex-col min-h-screen">
				<App className="flex-grow" />
			</div>
		</UserProvider>
	</React.StrictMode>
);
