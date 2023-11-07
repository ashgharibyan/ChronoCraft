import React, { useState } from "react";
import { Button } from "flowbite-react";
import {
	HiArrowSmLeft,
	HiArrowSmDown,
	HiArrowSmUp,
	HiChartPie,
	HiInbox,
	HiShoppingBag,
	HiTable,
	HiUser,
	HiViewBoards,
} from "react-icons/hi";

import SidebarButton from "../../components/Sidebar/SidebarButton";
import ProjectButton from "../../components/Sidebar/ProjectButton";

const SidebarComponent = () => {
	const foldersTest = ["Folder 1", "Folder 2", "Folder 3"];
	const listsTest = ["List 1", "List 2", "List 3"];
	const tasksTest = ["Task 1", "Task 2", "Task 3"];

	return (
		<div className=" min-w-[250px] bg-gradient-to-tr from-indigo-800 to-indigo-600 flex flex-col justify-between shadow-lg shadow-black">
			<div className="space-y-8 ">
				{/* Project name and arrow */}
				<div className="space-y-4">
					<div className="flex justify-between items-center px-4 pt-4">
						<h1 className=" text-white  uppercase text-3xl font-bold ">
							Mobile App
						</h1>
						<HiArrowSmLeft className="h-6 w-6 text-white " />
					</div>
					<hr />
				</div>
				{/* Menu Buttons */}
				<div className="space-y-2">
					<SidebarButton icon={HiViewBoards} label="Dashboard" />
					<SidebarButton
						icon={HiViewBoards}
						label="Projects Overview"
					/>
					<SidebarButton icon={HiViewBoards} label="Calendar" />
					<SidebarButton icon={HiViewBoards} label="Settings" />
					<SidebarButton icon={HiViewBoards} label="Goals" />
				</div>
				<hr />
				{/* Projects */}
				<div className="space-y-2 ">
					<h3 className="text-white uppercase text-base font-bold px-4">
						My Projects
					</h3>
					<div className="space-y-1 overflow-y-scroll max-h-[320px]">
						<ProjectButton
							icon={HiViewBoards}
							label="Project 1"
							folders={foldersTest}
							lists={listsTest}
							tasks={tasksTest}
						/>
						<ProjectButton
							icon={HiViewBoards}
							label="Project 2"
							folders={foldersTest}
							lists={listsTest}
							tasks={tasksTest}
						/>
						<ProjectButton
							icon={HiViewBoards}
							label="Project 3"
							folders={foldersTest}
							lists={listsTest}
							tasks={tasksTest}
						/>
					</div>
				</div>
			</div>
			{/* Bottom Menu Buttons */}

			<div className="space-y-2 py-4">
				<hr className="pt-2" />

				<SidebarButton icon={HiViewBoards} label="Account" />
				<SidebarButton icon={HiViewBoards} label="Log Out" />
			</div>
		</div>
	);
};

export default SidebarComponent;
