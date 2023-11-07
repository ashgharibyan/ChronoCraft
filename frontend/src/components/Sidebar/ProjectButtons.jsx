import React, { useState } from "react";
import { HiArrowSmDown, HiArrowSmUp, HiViewBoards } from "react-icons/hi";
import SidebarButton from "./SidebarButton";
const ProjectButtons = ({ icon: Icon, label }) => {
	const [projectArrowClicked, setProjectArrowClicked] = useState(false);

	if (projectArrowClicked) {
		return (
			<div
				onClick={() => setProjectArrowClicked(!projectArrowClicked)}
				className="flex justify-between items-center  hover:bg-indigo-900"
			>
				<SidebarButton icon={Icon} label={label} />

				<HiArrowSmUp className="h-4 w-4 text-white mr-4 " />
			</div>
		);
	} else {
		return (
			<div
				onClick={() => setProjectArrowClicked(!projectArrowClicked)}
				className="flex justify-between items-center  hover:bg-indigo-900"
			>
				<SidebarButton icon={Icon} label={label} />

				<HiArrowSmDown className="h-4 w-4 text-white mr-4 " />
			</div>
		);
	}
};

export default ProjectButtons;
