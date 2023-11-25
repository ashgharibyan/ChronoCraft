import { Route, Routes } from "react-router-dom";
import React from "react";
import NotFound from "../components/NotFound";
import Profile from "../sections/Account/Profile";
import Dashboard from "../sections/LoggedIn/Dashboard";
import ProjectsList from "../sections/LoggedIn/Projects/ProjectsList";
import ListDisplay from "../sections/LoggedIn/ListDisplay";
import CreateProject from "../sections/LoggedIn/CreateProject";
import EditProject from "../sections/LoggedIn/EditProject";
import DisplayProject from "../sections/LoggedIn/DisplayProject";
import DisplayFolder from "../sections/LoggedIn/DisplayFolder";

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
			<Route path="/edit-project/:project_id" element={<EditProject />} />
			<Route path="/project/:project_id" element={<DisplayProject />} />
			<Route
				path="/project/:project_id/folder/:folder_id"
				element={<DisplayFolder />}
			/>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default LoggedInRoutes;
