import React from "react";

const SidebarButton = ({ icon: Icon, label, customClassName }) => {
	return (
		<div
			className={`flex gap-2 items-center w-full text-white p-2 px-4 hover:bg-indigo-900 ${customClassName}`}
		>
			<Icon className="h-4 w-4" />
			<p className=" ">{label}</p>
		</div>
	);
};

export default SidebarButton;
