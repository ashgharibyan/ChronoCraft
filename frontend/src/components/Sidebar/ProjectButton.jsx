import React, { useState } from "react";
import SidebarButton from "./SidebarButton";
import FolderButton from "./FolderButton";
import {
	AiOutlineFolderOpen,
	AiOutlineDown,
	AiOutlineRight,
	AiOutlinePlus,
} from "react-icons/ai";

import {
	listFolderByProjectAxios,
	listListByFolderAxios,
} from "../../axios/ModelAxios";
import { useModel } from "../../contexts/ModelContext";
import { useNavigate } from "react-router-dom";
import { useGeneral } from "../../contexts/GeneralContext";

const ProjectButton = ({
	icon: Icon,
	label,
	tasks,
	folders,
	customClassName,
	project_id,
	isOpen,
	onProjectClick,
	projectArrowClicked,
}) => {
	// const [projectArrowClicked, setProjectArrowClicked] = useState(false);
	// const { projectArrowClicked, setProjectArrowClicked } = useGeneral();

	const navigate = useNavigate();
	const { lists, setLists } = useModel();
	const [openFolderId, setOpenFolderId] = useState(null);
	const { folderArrowClicked, setFolderArrowClicked } = useGeneral();

	const handleFolderOpen = (folderId) => {
		if (openFolderId === folderId) {
			setOpenFolderId(null); // Close the folder if it's already open
		} else {
			const folder_id = folderId;
			setOpenFolderId(folderId); // Open the new folder
			listListByFolderAxios(setLists, folder_id, navigate);
		}
		setFolderArrowClicked(!folderArrowClicked);
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
				<AiOutlinePlus className="h-4 w-4 text-white mr-4 " />
			</div>

			{isOpen &&
				folders &&
				folders.map((folder, idx) => (
					<FolderButton
						icon={AiOutlineFolderOpen}
						key={idx}
						customClassName="pl-2"
						lists={lists}
						tasks={tasks}
						label={folder.name}
						isOpen={openFolderId === folder.id}
						onFolderClick={() => handleFolderOpen(folder.id)}
					/>
				))}
		</div>
	);
};

export default ProjectButton;
