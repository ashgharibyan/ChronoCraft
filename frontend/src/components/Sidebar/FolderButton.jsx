import React, { useState } from "react";
import { HiArrowSmDown, HiArrowSmLeft, HiViewBoards } from "react-icons/hi";
import SidebarButton from "./SidebarButton";
const FolderButton = ({ icon: Icon, label, lists, tasks, customClassName }) => {
	const [folderArrowClicked, setFolderArrowClicked] = useState(false);

	if (folderArrowClicked) {
		return (
			<div className={`space-y-1  `}>
				<div
					onClick={() => setFolderArrowClicked(!folderArrowClicked)}
					className={`flex justify-between items-center  hover:bg-indigo-900 ${customClassName} `}
				>
					<SidebarButton icon={Icon} label={label} />
					<HiArrowSmDown className="h-4 w-4 text-white mr-4 " />
				</div>
				{lists
					? lists.map((list, idx) => {
							return (
								<SidebarButton
									key={idx}
									customClassName="pl-8"
									icon={HiViewBoards}
									label={list}
								/>
							);
					  })
					: null}
			</div>
		);
	} else {
		return (
			<div
				onClick={() => setFolderArrowClicked(!folderArrowClicked)}
				className={`flex justify-between items-center  hover:bg-indigo-900 ${customClassName}`}
			>
				<SidebarButton icon={Icon} label={label} />

				<HiArrowSmLeft className="h-4 w-4 text-white mr-4 " />
			</div>
		);
	}
};

export default FolderButton;
