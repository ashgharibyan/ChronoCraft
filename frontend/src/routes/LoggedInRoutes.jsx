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
import CreateFolder from "../sections/LoggedIn/CreateFolder";
import CreateList from "../sections/LoggedIn/CreateList";
import CreateTask from "../sections/LoggedIn/CreateTask";
import EditFolder from "../sections/LoggedIn/EditFolder";
import EditList from "../sections/LoggedIn/EditList";

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
			<Route
				path="/:project_id/create-folder"
				element={<CreateFolder />}
			/>
			<Route
				path="/:project_id/:folder_id/create-list"
				element={<CreateList />}
			/>
			<Route
				path="/:project_id/:folder_id/:list_id/create-task"
				element={<CreateTask />}
			/>
			<Route path="/project/:project_id/edit" element={<EditProject />} />
			<Route path="/project/:project_id" element={<DisplayProject />} />
			<Route
				path="/project/:project_id/folder/:folder_id"
				element={<DisplayFolder />}
			/>
			<Route
				path="/project/:project_id/folder/:folder_id/edit"
				element={<EditFolder />}
			/>
			<Route
				path="/project/:project_id/folder/:folder_id/list/:list_id/edit"
				element={<EditList />}
			/>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default LoggedInRoutes;
