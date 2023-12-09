import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
	getProjectByIdAxios,
	listFolderByProjectAxios,
} from "../../axios/ModelAxios";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { BsPlusCircle } from "react-icons/bs";

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
		<div id="display-project" className="bg-gray-50 h-full p-4">
			<div className="flex items-center gap-4 w-full">
				{currentProject && (
					<div className=" p-2 min-w-[75%]">
						<h1 className="text-3xl">{currentProject.title}</h1>
						<h3 className="text-lg  p-2">
							{currentProject.description}
						</h3>
					</div>
				)}
				<div className="flex flex-col justify-center items-center w-[25%] text-center gap-2">
					<Link
						to={`/dashboard/${project_id}/create-folder/`}
						className="w-full p-2 border border-1 border-gray-400 flex items-center justify-center gap-2"
					>
						<BsPlusCircle className="h-5 w-5 text-black " />
						<button className=" text-black">Create Folder</button>
					</Link>
					<Link
						to={`/dashboard/project/${project_id}/edit/`}
						className="w-full p-2 border border-1 border-gray-400 flex items-center justify-center gap-2"
					>
						<BsPlusCircle className="h-5 w-5 text-black " />
						<button className=" text-black">Edit Project</button>
					</Link>
				</div>
			</div>

			{currentProjectFolders && (
				<div className="bg-gray-100 h-full p-4 w-full flex justify-start items-center flex-col border border-1 border-gray-500 ">
					{currentProjectFolders.map((folder) => (
						<div
							className="flex items-cneter justify-between min-w-fit w-[50%] mt-2 gap-4"
							key={folder.id}
						>
							<div className="flex justify-start items-center p-2 min-w-fit gap-4">
								<AiOutlineFolderOpen className="h-12 w-12 text-black " />
								<h2 className="text-4xl">{folder.name}</h2>
							</div>
							<div className="flex flex-col justify-center items-center min-w-[25%] text-center gap-2">
								<Link
									to={`/dashboard/project/${project_id}/folder/${folder.id}`}
									className=" w-full p-2 border border-1 border-gray-400 flex items-center justify-center gap-2"
								>
									<button className="p-2 text-black">
										Open Folder
									</button>
								</Link>
								<Link
									to={`/dashboard/project/${project_id}/folder/${folder.id}/edit`}
									className="w-full p-2 border border-1 border-gray-400 flex items-center justify-center gap-2"
								>
									<button className="p-2 text-black">
										Edit Folder
									</button>
								</Link>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default DisplayProject;
