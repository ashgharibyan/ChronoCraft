import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
	getFolderByIdAxios,
	listListsByFolderAxios,
	updateFolderByIdAxios,
} from "../../axios/ModelAxios";
import { useModel } from "../../contexts/ModelContext";
import { useGeneral } from "../../contexts/GeneralContext";
import { BsPlusCircle } from "react-icons/bs";
import { FaRegCheckCircle } from "react-icons/fa";
import { GoDot } from "react-icons/go";

import { FaEdit } from "react-icons/fa";

const DisplayFolder = () => {
	const { project_id, folder_id } = useParams();
	const [currentFolder, setCurrentFolder] = useState(null);
	const [currentFolderLists, setCurrentFolderLists] = useState(null);
	const { lists, setLists, selectedFolder, setSelectedFolder } = useModel();
	const [editToggle, setEditToggle] = useState(false);

	const [folderErrors, setFolderErrors] = useState(null);
	const navigate = useNavigate();
	const { setTriggerSidebarRefresh, setTriggerSidebarFolderRefresh } =
		useGeneral();

	useEffect(() => {
		// if (selectedFolder === null) {
		// 	console.log("inside if of DisplayFolder");
		if (project_id && folder_id) {
			// Get project data
			const fetchFolderData = async () => {
				try {
					const folderData = await getFolderByIdAxios(
						folder_id,
						navigate
					);
					// Handle the project data
					setCurrentFolder(folderData);
					setSelectedFolder(folderData);
					console.log("inside of try folder by id", folderData);
				} catch (error) {
					// Handle any errors
					console.error("Error fetching folder data:", error);
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
		// }
	}, [project_id, folder_id]);

	const handleChange = (e) => {
		setFolderErrors([]);
		setCurrentFolder({
			...currentFolder,
			[e.target.name]: e.target.value,
		});
	};

	const handleEditChanges = (e) => {
		e.preventDefault();
		setFolderErrors([]);

		let errors = [];
		if (currentFolder.name === "") {
			errors.push("Name cannot be empty");
		} else if (currentFolder.name.length > 100) {
			errors.push("Folder name cannot be longer than 100 characters");
		}

		if (errors.length > 0) {
			setFolderErrors(errors);
			return;
		}

		updateFolderByIdAxios(folder_id, currentFolder, navigate);
		setTriggerSidebarRefresh(true);
		setTriggerSidebarFolderRefresh(true);

		setEditToggle(false);
	};

	return (
		<div
			id="display-folder"
			className="bg-gray-50 overflow-y-scroll min-h-full overflow-x-scroll m-4  flex flex-col "
		>
			<div className="flex items-center justify-between gap-2 w-full p-4 ">
				{currentFolder &&
					(editToggle ? (
						<form
							className=" flex-grow flex flex-col gap-2"
							onSubmit={handleEditChanges}
						>
							{folderErrors &&
								folderErrors.map((error, idx) => (
									<p key={idx} className="text-red-500">
										{error}
									</p>
								))}
							<input
								className="text-2xl  lg:text-6xl w-full"
								type="text"
								name="name"
								value={currentFolder.name}
								onChange={handleChange}
							/>
						</form>
					) : (
						<h1
							className="flex-grow font-bold text-4xl lg:text-6xl"
							onDoubleClick={() => setEditToggle(true)}
						>
							{" "}
							{currentFolder.name}
						</h1>
					))}
				<div className="flex flex-col justify-center items-center max-w-[25%] text-center gap-2">
					<Link
						to={`/dashboard/${project_id}/${folder_id}/create-list/`}
						className="w-full p-2 border border-1 border-gray-400 flex items-center justify-between gap-2 hover:bg-gray-800 hover:text-gray-50"
					>
						<BsPlusCircle className="h-5 w-5  " />
						<button className="">Create A List</button>
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
							Edit Folder
						</button>
					)}
				</div>
			</div>
			{lists.length > 0 ? (
				<div className=" p-4 w-full flex justify-start items-center flex-col   ">
					{lists.map((list) => (
						<div
							className="flex items-cneter justify-between min-w-fit w-full border border-1 border-gray-500 mt-2 gap-4 bg-gray-100 p-2 hover:bg-gray-800 hover:text-gray-50"
							key={list.id}
						>
							{/* <AiOutlineFolderOpen className="h-8 w-8 text-white " /> */}
							<Link
								to={`/dashboard/${project_id}/${folder_id}/${list.id}`}
								className="flex justify-start items-center p-2 max-w-full flex-grow gap-4"
							>
								<GoDot className="h-12 w-12 " />
								<h2 className="text-4xl lg:text-4xl">
									{list.name}
								</h2>
							</Link>
							<div className="flex flex-col justify-center items-center min-w-[25%] text-center gap-2">
								<Link
									to={`/dashboard/${project_id}/${folder_id}/${list.id}`}
									className=" w-full p-2 border border-1 border-gray-400  flex items-center justify-center gap-2 hover:bg-gray-50 hover:text-gray-800"
								>
									<button className="p-2 ">Open List</button>
								</Link>
								<Link
									to={`/dashboard/project/${project_id}/folder/${folder_id}/list/${list.id}/edit`}
									className="w-full p-2 border border-1 border-gray-400 flex items-center justify-center gap-2 hover:bg-gray-50 hover:text-gray-800"
								>
									<button className="p-2 ">Edit List</button>
								</Link>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="text-lg mt-5 text-center">
					No lists in this folder
				</div>
			)}
		</div>
	);
};

export default DisplayFolder;
