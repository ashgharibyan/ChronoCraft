import React from "react";
import { AiOutlineCaretDown } from "react-icons/ai";

const TopBar = () => {
	return (
		<div className="flex w-full h-[83px] justify-between items-center p-4 bg-gradient-to-tr from-indigo-600 to-indigo-800  border-b-[1px] border-white">
			<div>
				<h1 className="text-white text-3xl font-bold uppercase">
					Mobile App
				</h1>
			</div>
		</div>
	);
};

export default TopBar;
