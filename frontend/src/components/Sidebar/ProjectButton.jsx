import React, { useState } from "react";
import SidebarButton from "./SidebarButton";
import FolderButton from "./FolderButton";
import {
	AiOutlineFolderOpen,
	AiOutlineDown,
	AiOutlineRight,
	AiOutlinePlus,
} from "react-icons/ai";

const ProjectButton = ({
	icon: Icon,
	label,
	folders,
	lists,
	tasks,
	customClassName,
}) => {
	const [projectArrowClicked, setProjectArrowClicked] = useState(false);

	if (projectArrowClicked) {
		return (
			<div className={`space-y-1  ${customClassName}`}>
				<div
					onClick={() => setProjectArrowClicked(!projectArrowClicked)}
					className={`flex justify-between items-center pl-4 hover:bg-indigo-900 `}
				>
					<div className="flex items-center ">
						<AiOutlineDown className="h-4 w-4 text-white  " />
						<SidebarButton icon={Icon} label={label} />
					</div>
					<AiOutlinePlus className="h-4 w-4 text-white mr-4 " />
				</div>

				{folders
					? folders.map((folder, idx) => {
							return (
								<FolderButton
									icon={AiOutlineFolderOpen}
									key={idx}
									customClassName="pl-2"
									lists={lists}
									tasks={tasks}
									label={folder}
								/>
							);
					  })
					: null}
			</div>
		);
	} else {
		return (
			<div
				onClick={() => setProjectArrowClicked(!projectArrowClicked)}
				className={`flex justify-between items-center  hover:bg-indigo-900 pl-4  ${customClassName}`}
			>
				<div className="flex items-center ">
					<AiOutlineRight className="h-4 w-4 text-white  " />
					<SidebarButton icon={Icon} label={label} />
				</div>
				<AiOutlinePlus className="h-4 w-4 text-white mr-4 " />
			</div>
		);
	}
};

export default ProjectButton;
