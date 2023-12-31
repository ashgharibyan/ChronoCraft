import React, { useEffect, useState } from "react";
import SidebarButton from "./SidebarButton";
import FolderButton from "./FolderButton";
import {
	AiOutlineFolderOpen,
	AiOutlineDown,
	AiOutlineRight,
	AiOutlinePlus,
} from "react-icons/ai";
import { MdEdit } from "react-icons/md";

import {
	listFolderByProjectAxios,
	listListsByFolderAxios,
} from "../../axios/ModelAxios";
import { useModel } from "../../contexts/ModelContext";
import { Link, useNavigate } from "react-router-dom";
import { useGeneral } from "../../contexts/GeneralContext";

const ProjectButton = ({
	icon: Icon,
	label,
	tasks,
	folders,
	customClassName,
	isOpen,
	onProjectClick,
	project_id,
}) => {
	const navigate = useNavigate();
	const { lists, setLists, selectedFolder, setSelectedFolder, setFolders } =
		useModel();
	const [openFolderId, setOpenFolderId] = useState(null);
	const {
		folderArrowClicked,
		setFolderArrowClicked,
		triggerSidebarFolderRefresh,
		setTriggerSidebarFolderRefresh,
	} = useGeneral();

	// useEffect(() => {
	// 	if (triggerSidebarFolderRefresh) {
	// 		const fetchFoldersData = async () => {
	// 			try {
	// 				const foldersData = await listFolderByProjectAxios(
	// 					project_id,
	// 					navigate
	// 				);
	// 				// Handle the project data
	// 				setFolders(foldersData);
	// 			} catch (error) {
	// 				// Handle any errors
	// 				console.error("Error fetching project data:", error);
	// 			}
	// 		};

	// 		// Call the function
	// 		fetchFoldersData();
	// 		setTriggerSidebarFolderRefresh(false);
	// 	}
	// }, [triggerSidebarFolderRefresh]);

	const handleFolderOpen = (folder) => {
		if (selectedFolder?.id === folder.id) {
			setSelectedFolder(null);
		} else {
			const folder_id = folder.id;
			setSelectedFolder(folder); // Open the new folder
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
		if (folderArrowClicked) {
			setFolderArrowClicked(false);
			navigate(`/dashboard/project/${project_id}`);
		} else {
			setFolderArrowClicked(true);
			navigate(`/dashboard/project/${project_id}/folder/${folder.id}`);
		}
	};

	return (
		<div className={`space-y-1  ${customClassName}`}>
			<div
				onClick={onProjectClick} // Use `onProjectClick` for handling click
				className={`flex justify-between items-center pl-4 hover:bg-indigo-900 `}
			>
				<div className="flex items-center ">
					{isOpen ? (
						<AiOutlineDown className="h-4 w-4 text-white  " />
					) : (
						<AiOutlineRight className="h-4 w-4 text-white  " />
					)}
					<SidebarButton icon={Icon} label={label} />
				</div>
				<Link
					to={`/dashboard/${project_id}/create-folder/`}
					onClick={(e) => e.stopPropagation()}
				>
					<AiOutlinePlus className="h-4 w-4 mr-4 text-white  " />
				</Link>
			</div>

			{isOpen &&
				folders &&
				folders.map((folder, idx) => (
					<FolderButton
						key={idx}
						icon={AiOutlineFolderOpen}
						customClassName="pl-2"
						lists={lists}
						tasks={tasks}
						label={folder.name}
						isOpen={selectedFolder?.id === folder.id}
						onFolderClick={() => handleFolderOpen(folder)}
					/>
				))}
		</div>
	);
};

export default ProjectButton;
