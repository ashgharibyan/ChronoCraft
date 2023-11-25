import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
	getFolderByIdAxios,
	listListsByFolderAxios,
} from "../../axios/ModelAxios";
import { useModel } from "../../contexts/ModelContext";

const DisplayFolder = () => {
	const { project_id, folder_id } = useParams();
	const [currentFolder, setCurrentFolder] = useState(null);
	const [currentFolderLists, setCurrentFolderLists] = useState(null);
	const { lists, setLists, selectedFolder, setSelectedFolder } = useModel();

	const navigate = useNavigate();

	useEffect(() => {
		if (selectedFolder === null) {
			console.log("inside if of DisplayFolder");
			if (project_id && folder_id) {
				// Get project data
				const fetchFolderData = async () => {
					try {
						const folderData = await getFolderByIdAxios(
							folder_id,
							navigate
						);
						// Handle the project data
						setSelectedFolder(folderData);
					} catch (error) {
						// Handle any errors
						console.error("Error fetching project data:", error);
					}
				};

				// Call the function
				fetchFolderData();
				// Get project folders

				const fetchListsData = async () => {
					try {
						const listsData = await listListsByFolderAxios(
							folder_id,
							navigate
						);
						// Handle the project data
						setLists(listsData);
					} catch (error) {
						// Handle any errors
						console.error("Error fetching project data:", error);
					}
				};

				// Call the function
				fetchListsData();
			}
		}
	}, [project_id, folder_id]);

	return (
		<div>
			Display Folder project id: {project_id} folder id: {folder_id}
			{selectedFolder && (
				<div>
					<h1>Folder: {selectedFolder.name}</h1>
				</div>
			)}
			{lists && (
				<div>
					{lists.map((list) => (
						<div
							className="flex items-center justify-center p-2 bg-gray-400 gap-4"
							key={list.id}
						>
							{/* <AiOutlineFolderOpen className="h-8 w-8 text-white " /> */}
							<h2>{list.name}</h2>
							<Link
								to={`/dashboard/${project_id}/${folder_id}/${list.id}`}
							>
								<button className="p-2 bg-white text-black">
									Open List
								</button>
							</Link>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default DisplayFolder;
