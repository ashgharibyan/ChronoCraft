import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
	getProjectByIdAxios,
	listFolderByProjectAxios,
	updateProjectByIdAxios,
} from "../../axios/ModelAxios";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { BsPlusCircle } from "react-icons/bs";
import { FaRegCheckCircle } from "react-icons/fa";

import { FaEdit } from "react-icons/fa";
import { useGeneral } from "../../contexts/GeneralContext";
import { useModel } from "../../contexts/ModelContext";
const DisplayProject = () => {
	const { project_id } = useParams();
	const [currentProject, setCurrentProject] = useState(null);
	const [currentProjectFolders, setCurrentProjectFolders] = useState(null);
	const [editToggle, setEditToggle] = useState(false);
	const [projectErrors, setProjectErrors] = useState(null);
	const {
		triggerTasksListViewRefresh,
		setTriggerTasksListViewRefresh,
		triggerSidebarRefresh,
		setTriggerSidebarRefresh,
		triggerSidebarFolderRefresh,
		setTriggerSidebarFolderRefresh,
		triggerSidebarListRefresh,
		setTriggerSidebarListRefresh,
		triggerSidebarTaskRefresh,
		setTriggerSidebarTaskRefresh,
	} = useGeneral();
	const navigate = useNavigate();

	const { folders, setFolders } = useModel();
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

					setFolders(foldersData);
				} catch (error) {
					// Handle any errors
					console.error(
						"Error fetching folder in displayproject.jsx data:",
						error
					);
				}
			};

			// Call the function
			fetchFoldersData();
		}
	}, [project_id]);

	const handleChange = (e) => {
		setProjectErrors([]);
		setCurrentProject({
			...currentProject,
			[e.target.name]: e.target.value,
		});
	};

	const handleEditChanges = (e) => {
		console.log("insied handle edit changes");
		e.preventDefault();
		setProjectErrors([]);

		let errors = [];
		if (currentProject.title === "") {
			errors.push("Title cannot be empty");
		} else if (currentProject.title.length > 120) {
			errors.push("Project title cannot be longer than 120 characters");
		}

		if (currentProject.description === "") {
			errors.push("Description cannot be empty");
		} else if (currentProject.description.length > 225) {
			errors.push(
				"Project description cannot be longer than 255 characters"
			);
		}

		if (errors.length > 0) {
			setProjectErrors(errors);
			return;
		}

		updateProjectByIdAxios(project_id, currentProject, navigate);
		setTriggerSidebarRefresh(true);

		setEditToggle(false);
	};

	return (
		<div
			id="display-project"
			className="bg-gray-50 overflow-y-scroll min-h-full overflow-x-scroll m-4  flex flex-col "
		>
			<div className="flex items-center justify-between gap-2 w-full p-4 ">
				{currentProject &&
					(editToggle ? (
						<form
							className=" flex-grow flex flex-col gap-2"
							onSubmit={handleEditChanges}
						>
							{projectErrors &&
								projectErrors.map((error, idx) => (
									<p key={idx} className="text-red-500 p-2">
										{error}
									</p>
								))}
							<input
								className="text-2xl  lg:text-6xl w-full"
								type="text"
								name="title"
								value={currentProject.title}
								onChange={handleChange}
							/>
							<textarea
								className="text-sm lg:text-2xl p-2 w-full"
								type="text"
								name="description"
								value={currentProject.description}
								onChange={handleChange}
							/>
						</form>
					) : (
						<div className=" flex-grow">
							<h1
								className="font-bold text-4xl lg:text-6xl"
								onDoubleClick={() => setEditToggle(true)}
							>
								{currentProject.title}
							</h1>
							<h3
								className="text-md lg:text-2xl  p-2"
								onDoubleClick={() => setEditToggle(true)}
							>
								{currentProject.description}
							</h3>
						</div>
					))}
				<div className="flex flex-col justify-center items-center max-w-[25%] text-center gap-2">
					<Link
						to={`/dashboard/${project_id}/create-folder/`}
						className="w-full p-2 border border-1 border-gray-400 flex items-center justify-between gap-2 hover:bg-gray-800 hover:text-gray-50"
					>
						<BsPlusCircle className="h-5 w-5  " />
						<button className=" ">Create A Folder</button>
					</Link>
					{editToggle ? (
						<button
							type="submit"
							className="w-full p-2 border border-1 border-gray-400 flex items-center justify-between gap-2 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800"
							onClick={handleEditChanges}
						>
							<FaRegCheckCircle className="h-5 w-5  " />
							Submit Changes
						</button>
					) : (
						<button
							className="w-full p-2 border border-1 border-gray-400 flex items-center justify-between gap-2 hover:bg-gray-800 hover:text-gray-50"
							onClick={() => setEditToggle(true)}
						>
							<FaEdit className="h-5 w-5  " />
							Edit Project
						</button>
					)}
				</div>
			</div>

			{folders.length > 0 ? (
				<div className=" p-4 w-full flex justify-start items-center flex-col   ">
					{folders.map((folder) => (
						<div
							className="flex items-cneter justify-between min-w-fit w-full border border-1 border-gray-500 mt-2 gap-4 bg-gray-100 p-2 hover:bg-gray-800 hover:text-gray-50"
							key={folder.id}
						>
							<Link
								to={`/dashboard/project/${project_id}/folder/${folder.id}`}
								className="flex justify-start items-center p-2 max-w-full flex-grow gap-4"
							>
								<AiOutlineFolderOpen className="h-12 w-12 " />
								<h2 className="text-4xl lg:text-4xl">
									{folder.name}
								</h2>
							</Link>
							<div className="flex flex-col justify-center items-center min-w-[25%] text-center gap-2">
								<Link
									to={`/dashboard/project/${project_id}/folder/${folder.id}`}
									className=" w-full p-2 border border-1 border-gray-400  flex items-center justify-center gap-2 hover:bg-gray-50 hover:text-gray-800"
								>
									<button className="p-2">Open Folder</button>
								</Link>
								<Link
									to={`/dashboard/project/${project_id}/folder/${folder.id}/edit`}
									className="w-full p-2 border border-1 border-gray-400 flex items-center justify-center gap-2 hover:bg-gray-50 hover:text-gray-800"
								>
									<button className="p-2 ">
										Edit Folder
									</button>
								</Link>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="text-lg mt-5 text-center">
					No folders in this project
				</div>
			)}
		</div>
	);
};

export default DisplayProject;
