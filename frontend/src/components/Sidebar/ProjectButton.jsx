import React, { useState } from "react";
import { HiArrowSmDown, HiArrowSmLeft, HiViewBoards } from "react-icons/hi";
import SidebarButton from "./SidebarButton";
import FolderButton from "./FolderButton";
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
					className={`flex justify-between items-center  hover:bg-indigo-900 `}
				>
					<SidebarButton icon={Icon} label={label} />
					<HiArrowSmDown className="h-4 w-4 text-white mr-4 " />
				</div>
				{folders
					? folders.map((folder, idx) => {
							return (
								<FolderButton
									key={idx}
									customClassName="pl-2"
									icon={HiViewBoards}
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
				className={`flex justify-between items-center  hover:bg-indigo-900 ${customClassName}`}
			>
				<SidebarButton icon={Icon} label={label} />

				<HiArrowSmLeft className="h-4 w-4 text-white mr-4 " />
			</div>
		);
	}
};

export default ProjectButton;
