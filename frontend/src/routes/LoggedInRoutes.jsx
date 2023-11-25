import { Route, Routes } from "react-router-dom";
import React from "react";
import NotFound from "../components/NotFound";
import Profile from "../sections/Account/Profile";
import Dashboard from "../sections/LoggedIn/Dashboard";
import ProjectsList from "../sections/LoggedIn/Projects/ProjectsList";
import ListDisplay from "../sections/LoggedIn/ListDisplay";
import CreateProject from "../sections/LoggedIn/CreateProject";
const LoggedInRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="/profile/" element={<Profile />} />
			<Route path="/projects-overview/" element={<ProjectsList />} />
			<Route
				path="/:projectId/:folderId/:listId"
				element={<ListDisplay />}
			/>
			<Route path="/create-project" element={<CreateProject />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default LoggedInRoutes;
