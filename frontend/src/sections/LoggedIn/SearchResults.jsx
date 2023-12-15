import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
	searchFolder,
	searchList,
	searchProject,
	searchTask,
} from "../../axios/ModelAxios";

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
					console.log("Projects loaded");
					console.log(projectSearchResults);
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
					console.log("Folders loaded");
					console.log(folderSearchResults);
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
					console.log("Lists loaded");
					console.log(listSearchResults);
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
					console.log("Tasks loaded");
					console.log(taskSearchResults);
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
		<div>
			{loaded ? (
				<div>
					{projectResults.length < 1 &&
					folderResults < 1 &&
					listResults < 1 &&
					taskResults < 1 ? (
						<h1>No results found</h1>
					) : (
						<div>
							{projectResults.map((project) => (
								<Link
									to={`/dashboard/project/${project.id}`}
									key={project.id}
								>
									<div className="mt-2 p-2 bg-gray-200 flex justify-between items-center">
										<h1>{project.title}</h1>
										<h2 className="hover:text-indigo-600">
											Go to Project
										</h2>
									</div>
								</Link>
							))}

							{folderResults.map((folder) => (
								<Link
									to={`/dashboard/project/${folder.parent_project}/folder/${folder.id}`}
									key={folder.id}
								>
									<div className="mt-2 p-2 bg-gray-200 flex justify-between items-center">
										<h1>{folder.name}</h1>
										<h2 className="hover:text-indigo-600">
											Go to Folder
										</h2>
									</div>
								</Link>
							))}

							{listResults.map((list) => (
								<Link
									to={`/dashboard/${list.parent_folder}/${list.id}`}
									key={follistder.id}
								>
									<div className="mt-2 p-2 bg-gray-200">
										<h1>{list.name}</h1>
									</div>
								</Link>
							))}

							{taskResults.map((task) => (
								<div
									key={task.id}
									className="mt-2 p-2 bg-gray-200"
								>
									<h1>{task.name}</h1>
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
