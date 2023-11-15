import React, { useState } from "react";
import SidebarButton from "./SidebarButton";
import { GoDot } from "react-icons/go";
import { AiOutlinePlus, AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import { useGeneral } from "../../contexts/GeneralContext";
import { listTasksByListAxios } from "../../axios/ModelAxios";
import { useModel } from "../../contexts/ModelContext";
import { useNavigate } from "react-router-dom";

const FolderButton = ({
	icon: Icon,
	label,
	lists,
	tasks,
	customClassName,
	onFolderClick,
	isOpen,
}) => {
	const { setTasks, selectedProject, selectedFolder, setSelectedList } =
		useModel();
	const navigate = useNavigate();

	const onListClick = (list_id) => {
		setSelectedList(list_id);
		navigate(`${selectedProject}/${selectedFolder}/${list_id}`);

		console.log("List clicked");
	};

	return (
		<div className={`space-y-1`}>
			<div
				onClick={onFolderClick}
				className={`flex justify-between items-center pl-6  hover:bg-indigo-900 ${customClassName} `}
			>
				<div className="flex items-center gap-1">
					{isOpen ? (
						<AiOutlineDown className="h-4 w-4 text-white " />
					) : (
						<AiOutlineRight className="h-4 w-4 text-white " />
					)}
					<SidebarButton icon={Icon} label={label} />
				</div>
				<AiOutlinePlus className="h-4 w-4 text-white mr-4 " />
			</div>
			{isOpen &&
				lists &&
				lists.map((list, idx) => {
					return (
						<SidebarButton
							key={idx}
							icon={GoDot}
							customClassName="pl-8"
							label={list.name}
							onClick={() => onListClick(list.id)}
						/>
					);
				})}
		</div>
	);
};

export default FolderButton;
