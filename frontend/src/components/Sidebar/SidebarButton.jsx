import React from "react";

const SidebarButton = ({ icon: Icon, label, customClassName }) => {
	return (
		<div
			className={`flex gap-2 items-center w-full text-white hover:bg-indigo-900 hover:py-4 hover:text-xl py-1 px-4 ${customClassName}`}
		>
			{Icon ? <Icon className="h-4 w-4" /> : ""}
			<p className=" ">{label}</p>
		</div>
	);
};

export default SidebarButton;
