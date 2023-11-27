import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
	getProjectByIdAxios,
	listFolderByProjectAxios,
} from "../../axios/ModelAxios";
import { AiOutlineFolderOpen } from "react-icons/ai";

const DisplayProject = () => {
	const { project_id } = useParams();
	const [currentProject, setCurrentProject] = useState(null);
	const [currentProjectFolders, setCurrentProjectFolders] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (project_id) {
			// Get project data
			const fetchProjectData = async () => {
				try {
					const projectData = await getProjectByIdAxios(
						project_id,
						navigate
					);
					// Handle the project data
					setCurrentProject(projectData);
				} catch (error) {
					// Handle any errors
					console.error("Error fetching project data:", error);
				}
			};

			// Call the function
			fetchProjectData();
			// Get project folders

			const fetchFoldersData = async () => {
				try {
					const foldersData = await listFolderByProjectAxios(
						project_id,
						navigate
					);
					// Handle the project data
					console.log(foldersData);
					setCurrentProjectFolders(foldersData);
				} catch (error) {
					// Handle any errors
					console.error("Error fetching project data:", error);
				}
			};

			// Call the function
			fetchFoldersData();
		}
	}, [project_id]);

	return (
		<div>
			{currentProject && (
				<div>
					<h1>Project: {currentProject.title}</h1>
					<h3>{currentProject.description}</h3>
				</div>
			)}

			<Link to={`/dashboard/${project_id}/create-folder/`}>
				<button className="p-2 bg-white text-black">
					Create Folder
				</button>
			</Link>

			<Link to={`/dashboard/project/${project_id}/edit/`}>
				<button className="p-2 bg-white text-black">
					Edit Project
				</button>
			</Link>

			{currentProjectFolders && (
				<div>
					{currentProjectFolders.map((folder) => (
						<div
							className="flex items-center justify-center p-2 bg-gray-400 gap-4"
							key={folder.id}
						>
							<AiOutlineFolderOpen className="h-8 w-8 text-white " />
							<h2>{folder.name}</h2>
							<Link
								to={`/dashboard/project/${project_id}/folder/${folder.id}`}
							>
								<button className="p-2 bg-white text-black">
									Open Folder
								</button>
							</Link>

							<Link
								to={`/dashboard/project/${project_id}/folder/${folder.id}/edit`}
							>
								<button className="p-2 bg-white text-black">
									Edit Folder
								</button>
							</Link>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default DisplayProject;
