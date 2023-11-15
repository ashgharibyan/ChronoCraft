import React, { useState } from "react";
import SidebarButton from "./SidebarButton";
import { GoDot } from "react-icons/go";
import { AiOutlinePlus, AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import { useGeneral } from "../../contexts/GeneralContext";

const FolderButton = ({
	icon: Icon,
	label,
	lists,
	tasks,
	customClassName,
	onFolderClick,
	isOpen,
}) => {
	return (
		<div className={`space-y-1  `}>
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
						/>
					);
				})}
		</div>
	);
};

export default FolderButton;
