import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
	searchFolder,
	searchList,
	searchProject,
	searchTask,
} from "../../axios/ModelAxios";

import { AiOutlineDown, AiOutlineLeft } from "react-icons/ai";

const SearchResults = () => {
	const { searchTerm } = useParams();
	const navigate = useNavigate();
	const [loaded, setLoaded] = useState(true);
	// const [projectsLoaded, setProjectsLoaded] = useState(false);
	// const [foldersLoaded, setFoldersLoaded] = useState(false);
	// const [listsLoaded, setListsLoaded] = useState(false);
	// const [tasksLoaded, setTasksLoaded] = useState(false);
	const [projectResults, setProjectResults] = useState([]);
	const [folderResults, setFolderResults] = useState([]);
	const [listResults, setListResults] = useState([]);
	const [taskResults, setTaskResults] = useState([]);

	const [isProjectsOpen, setIsProjectsOpen] = useState(true);
	const [isFoldersOpen, setIsFoldersOpen] = useState(true);
	const [isListsOpen, setIsListsOpen] = useState(true);
	const [isTasksOpen, setIsTasksOpen] = useState(true);
	useEffect(() => {
		let projectsLoaded,
			foldersLoaded,
			listsLoaded,
			tasksLoaded = false;
		if (searchTerm != "") {
			const fetchProjectsSearch = async () => {
				try {
					const projectSearchResults = await searchProject(
						searchTerm,
						navigate
					);
					// Handle the project data
					setProjectResults(projectSearchResults);
					projectsLoaded = true;
					// console.log("Projects loaded");
					// console.log(projectSearchResults);
				} catch (error) {
					// Handle any errors
					console.error("Error searching projects :", error);
				}
			};

			// Call the function
			fetchProjectsSearch();

			const fetchFoldersSearch = async () => {
				try {
					const folderSearchResults = await searchFolder(
						searchTerm,
						navigate
					);
					// Handle the folder data
					setFolderResults(folderSearchResults);
					foldersLoaded = true;
					// console.log("Folders loaded");
					// console.log(folderSearchResults);
				} catch (error) {
					// Handle any errors
					console.error("Error searching folders :", error);
				}
			};

			// Call the function
			fetchFoldersSearch();

			const fetchListsSearch = async () => {
				try {
					const listSearchResults = await searchList(
						searchTerm,
						navigate
					);
					// Handle the list data
					setListResults(listSearchResults);
					listsLoaded = true;
					// console.log("Lists loaded");
					// console.log(listSearchResults);
				} catch (error) {
					// Handle any errors
					console.error("Error searching lists :", error);
				}
			};

			// Call the function
			fetchListsSearch();

			const fetchTasksSearch = async () => {
				try {
					const taskSearchResults = await searchTask(
						searchTerm,
						navigate
					);
					// Handle the task data
					setTaskResults(taskSearchResults);
					tasksLoaded = true;
					// console.log("Tasks loaded");
					// console.log(taskSearchResults);
				} catch (error) {
					// Handle any errors
					console.error("Error searching tasks :", error);
				}
			};

			// Call the function
			fetchTasksSearch();
		}

		if (projectsLoaded && foldersLoaded && listsLoaded && tasksLoaded) {
			setLoaded(true);
		}
	}, []);

	return (
		<div className="my-4">
			{loaded ? (
				<div>
					{projectResults.length < 1 &&
					folderResults < 1 &&
					listResults < 1 &&
					taskResults < 1 ? (
						<h1>No results found</h1>
					) : (
						<div>
							<div
								className="flex justify-between items-center bg-indigo-600 px-4 py-2 text-gray-50 mt-2"
								onClick={() =>
									setIsProjectsOpen(!isProjectsOpen)
								}
							>
								<h1 className="font-bold text-2xl">Projects</h1>
								{isProjectsOpen ? (
									<AiOutlineDown className="h-4 w-4 text-white font-bold " />
								) : (
									<AiOutlineLeft className="h-4 w-4 text-white  " />
								)}
							</div>
							{isProjectsOpen &&
								(projectResults.length > 0 ? (
									projectResults.map((project) => (
										<Link
											to={`/dashboard/project/${project.id}`}
											key={project.id}
										>
											<div className="mt-2 p-2 mx-8 rounded-lg hover:bg-indigo-600  hover:text-gray-50 border-2 border-indigo-600 bg-gray-50 flex justify-between items-center">
												<h1>{project.title}</h1>
												<h2 className="  text-gray-50 bg-indigo-600  rounded-lg px-2 py-1 hover:bg-white hover:text-indigo-600">
													Go to Project
												</h2>
											</div>
										</Link>
									))
								) : (
									<div className="mt-2 p-2 pl-8 bg-gray-200 flex justify-between items-center">
										<h1>No projects found</h1>
									</div>
								))}

							<div
								className="flex justify-between items-center bg-indigo-600 px-4 py-2 text-gray-50 mt-2"
								onClick={() => setIsFoldersOpen(!isFoldersOpen)}
							>
								<h1 className="font-bold text-2xl">Folders</h1>
								{isFoldersOpen ? (
									<AiOutlineDown className="h-4 w-4 text-white font-bold " />
								) : (
									<AiOutlineLeft className="h-4 w-4 text-white  " />
								)}
							</div>
							{isFoldersOpen &&
								(folderResults.length > 0 ? (
									folderResults.map((folder) => (
										<Link
											to={`/dashboard/project/${folder.parent_project}/folder/${folder.id}`}
											key={folder.id}
										>
											<div className="mt-2 p-2 mx-8 rounded-lg hover:bg-indigo-600  hover:text-gray-50 border-2 border-indigo-600 bg-gray-50 flex justify-between items-center">
												<h1>{folder.name}</h1>
												<h2 className="  text-gray-50 bg-indigo-600  rounded-lg px-2 py-1 hover:bg-white hover:text-indigo-600">
													Go to Folder
												</h2>
											</div>
										</Link>
									))
								) : (
									<div className="mt-2 p-2 pl-8 bg-gray-200 flex justify-between items-center">
										<h1>No folders found</h1>
									</div>
								))}

							<div
								className="flex justify-between items-center bg-indigo-600 px-4 py-2 text-gray-50 mt-2"
								onClick={() => setIsListsOpen(!isListsOpen)}
							>
								<h1 className="font-bold text-2xl">Lists</h1>
								{isListsOpen ? (
									<AiOutlineDown className="h-4 w-4 text-white font-bold " />
								) : (
									<AiOutlineLeft className="h-4 w-4 text-white  " />
								)}
							</div>
							{isListsOpen &&
								(listResults.length > 0 ? (
									listResults.map((list) => (
										<Link
											to={`/dashboard/${list.parent_project_id}/${list.parent_folder}/${list.id}`}
											key={list.id}
										>
											<div className="mt-2 p-2 mx-8 rounded-lg hover:bg-indigo-600  hover:text-gray-50 border-2 border-indigo-600 bg-gray-50 flex justify-between items-center">
												<h1>{list.name}</h1>
												<h2 className="  text-gray-50 bg-indigo-600  rounded-lg px-2 py-1 hover:bg-white hover:text-indigo-600">
													Go to List
												</h2>
											</div>
										</Link>
									))
								) : (
									<div className="mt-2 p-2 pl-8 bg-gray-200 flex justify-between items-center">
										<h1>No lists found</h1>
									</div>
								))}

							<div
								className="flex justify-between items-center bg-indigo-600 px-4 py-2 text-gray-50 mt-2"
								onClick={() => setIsTasksOpen(!isTasksOpen)}
							>
								<h1 className="font-bold text-2xl">Tasks</h1>
								{isTasksOpen ? (
									<AiOutlineDown className="h-4 w-4 text-white font-bold " />
								) : (
									<AiOutlineLeft className="h-4 w-4 text-white  " />
								)}
							</div>
							{isTasksOpen &&
								(listResults.length > 0 ? (
									taskResults.map((task) => (
										<Link
											to={`/dashboard/${task.parent_project_id}/${task.parent_folder_id}/${task.parent_list}/${task.id}`}
											key={task.id}
										>
											<div className="mt-2 p-2 mx-8 rounded-lg hover:bg-indigo-600  hover:text-gray-50 border-2 border-indigo-600 bg-gray-50 flex justify-between items-center">
												<h1>{task.name}</h1>
												<h2 className="  text-gray-50 bg-indigo-600  rounded-lg px-2 py-1 hover:bg-white hover:text-indigo-600">
													Go to Task
												</h2>
											</div>{" "}
										</Link>
									))
								) : (
									<div className="mt-2 p-2 pl-8 bg-gray-200 flex justify-between items-center">
										<h1>No tasks found</h1>
									</div>
								))}
						</div>
					)}
				</div>
			) : (
				<h1>Loading...</h1>
			)}
		</div>
	);
};

export default SearchResults;
