import React from "react";
import { Button } from "flowbite-react";
import {
	HiArrowSmLeft,
	HiChartPie,
	HiInbox,
	HiShoppingBag,
	HiTable,
	HiUser,
	HiViewBoards,
} from "react-icons/hi";

import SidebarButton from "../../components/Sidebar/SidebarButton";

const SidebarComponent = () => {
	return (
		<div className="p-4 min-w-[250px] bg-indigo-500 flex flex-col justify-between">
			<div className="space-y-8 ">
				<div className="space-y-4">
					<div className="flex justify-between items-center">
						<h1 className=" text-white  uppercase text-3xl font-bold">
							Mobile App
						</h1>
						<HiArrowSmLeft className="h-6 w-6 text-white " />
					</div>
					<hr className="" />
				</div>
				<div className="space-y-2">
					<SidebarButton icon={HiViewBoards} label="Dashboard" />
					<SidebarButton icon={HiViewBoards} label="Dashboard" />
					<SidebarButton icon={HiViewBoards} label="Dashboard" />
					<SidebarButton icon={HiViewBoards} label="Dashboard" />
					<SidebarButton icon={HiViewBoards} label="Dashboard" />
				</div>
			</div>
			<div className="space-y-2 ">
				<SidebarButton icon={HiViewBoards} label="Settings" />
				<SidebarButton icon={HiViewBoards} label="Log Out" />
			</div>
		</div>
	);
};

export default SidebarComponent;
