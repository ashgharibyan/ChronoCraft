import React, { useState } from "react";
import SidebarButton from "./SidebarButton";
import { GoDot } from "react-icons/go";
import { AiOutlinePlus, AiOutlineDown, AiOutlineRight } from "react-icons/ai";

const FolderButton = ({ icon: Icon, label, lists, tasks, customClassName }) => {
	const [folderArrowClicked, setFolderArrowClicked] = useState(false);

	if (folderArrowClicked) {
		return (
			<div className={`space-y-1  `}>
				<div
					onClick={() => setFolderArrowClicked(!folderArrowClicked)}
					className={`flex justify-between items-center pl-6  hover:bg-indigo-900 ${customClassName} `}
				>
					<div className="flex items-center gap-1">
						<AiOutlineDown className="h-4 w-4 text-white " />
						<SidebarButton icon={Icon} label={label} />
					</div>
					<AiOutlinePlus className="h-4 w-4 text-white mr-4 " />
				</div>
				{lists
					? lists.map((list, idx) => {
							return (
								<SidebarButton
									key={idx}
									icon={GoDot}
									customClassName="pl-8"
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
				className={`flex justify-between items-center pl-6 hover:bg-indigo-900 ${customClassName}`}
			>
				<div className="flex items-center gap-1">
					<AiOutlineRight className="h-4 w-4 text-white  " />
					<SidebarButton icon={Icon} label={label} />
				</div>
				<AiOutlinePlus className="h-4 w-4 text-white mr-4 " />
			</div>
		);
	}
};

export default FolderButton;
