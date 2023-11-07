import React from "react";

const SidebarButton = ({ icon: Icon, label }) => {
	return (
		<div className="flex gap-2 items-center w-full rounded-md text-white border-[1px] p-2 border-white">
			<Icon className="h-4 w-4" />
			<p className=" ">{label}</p>
		</div>
	);
};

export default SidebarButton;
