import React, { useState } from "react";
import SidebarButton from "./SidebarButton";
import FolderButton from "./FolderButton";
import {
	AiOutlineFolderOpen,
	AiOutlineDown,
	AiOutlineRight,
	AiOutlinePlus,
} from "react-icons/ai";

import { listFolderByProjectAxios } from "../../axios/ModelAxios";
import { useModel } from "../../contexts/ModelContext";
import { useNavigate } from "react-router-dom";
import { useGeneral } from "../../contexts/GeneralContext";

const ProjectButton = ({
	icon: Icon,
	label,
	lists,
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

	const handleProjectButtonClicked = () => {
		if (projectArrowClicked == false) {
			listFolderByProjectAxios(setFolders, project_id, navigate);
		}

		setProjectArrowClicked(!projectArrowClicked);
	};

	// if (projectArrowClicked) {
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
					/>
				))}
		</div>
	);
	// } else {
	// 	return (
	// 		<div
	// 			onClick={onProjectClick}
	// 			className={`flex justify-between items-center  hover:bg-indigo-900 pl-4  ${customClassName}`}
	// 		>
	// 			<div className="flex items-center ">
	// 				<AiOutlineRight className="h-4 w-4 text-white  " />
	// 				<SidebarButton icon={Icon} label={label} />
	// 			</div>
	// 			<AiOutlinePlus className="h-4 w-4 text-white mr-4 " />
	// 		</div>
	// 	);
	// }
};

export default ProjectButton;
