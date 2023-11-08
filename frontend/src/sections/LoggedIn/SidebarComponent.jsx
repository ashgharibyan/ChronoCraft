import React, { useState } from "react";
import { HiArrowSmLeft } from "react-icons/hi";
import { BsPlusCircle } from "react-icons/bs";
import { GoProjectRoadmap } from "react-icons/go";
import SidebarButton from "../../components/Sidebar/SidebarButton";
import ProjectButton from "../../components/Sidebar/ProjectButton";
import { MdSpaceDashboard } from "react-icons/md";
import { SiCodereview } from "react-icons/si";
import { BsCalendarRange } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { LuGoal } from "react-icons/lu";
import { VscAccount } from "react-icons/vsc";
import { BiLogOutCircle } from "react-icons/bi";
import { useGeneral } from "../../contexts/GeneralContext";

const SidebarComponent = () => {
	const foldersTest = ["Folder 1", "Folder 2", "Folder 3"];
	const listsTest = ["List 1", "List 2", "List 3"];
	const tasksTest = ["Task 1", "Task 2", "Task 3"];
	const { toggleSidebar, setToggleSidebar, setWasToggledManually } =
		useGeneral();

	const handleSidebarToggleButton = () => {
		setToggleSidebar(!toggleSidebar);
		setWasToggledManually(true);
	};
	return (
		<div
			className={`border-r-[1px]  max-h-screen border-white min-w-[300px] bg-gradient-to-tr from-indigo-800 to-indigo-600 flex flex-col shadow-lg shadow-black`}
		>
			{/* Project name and arrow */}
			<div className="space-y-4">
				<div className="flex justify-between items-center px-4 pt-4">
					<h1 className=" text-white  uppercase text-3xl font-bold ">
						Mobile App
					</h1>
					<button type="button" onClick={handleSidebarToggleButton}>
						<HiArrowSmLeft className="h-6 w-6 text-white " />
					</button>
				</div>
				<hr className="border-white" />
			</div>

			<div className="space-y-4 overflow-y-scroll flex justify-between flex-col h-full">
				{/* Menu Buttons */}
				<div>
					<div className="space-y-2 py-4">
						<SidebarButton
							icon={MdSpaceDashboard}
							label="Dashboard"
						/>
						<SidebarButton
							icon={SiCodereview}
							label="Projects Overview"
						/>
						<SidebarButton
							icon={BsCalendarRange}
							label="Calendar"
						/>
						<SidebarButton
							icon={IoSettingsOutline}
							label="Settings"
						/>
						<SidebarButton icon={LuGoal} label="Goals" />
					</div>
					<hr className=" border-white" />

					{/* Projects */}
					<div className="space-y-2 ">
						<div className="flex justify-between items-center  px-4 py-2 pt-4">
							<h3 className="text-white uppercase text-lg font-bold ">
								My Projects
							</h3>

							<BsPlusCircle className="h-4 w-4 text-white " />
						</div>
						{/* <div className="space-y-1 overflow-y-scroll max-h-[425px] "> */}
						<div className="space-y-1 overflow-y-scroll min-h-[200px] max-h-[calc(100vh-450px)] ">
							<ProjectButton
								label="Project 1"
								icon={GoProjectRoadmap}
								folders={foldersTest}
								lists={listsTest}
								tasks={tasksTest}
							/>
							<ProjectButton
								label="Project 2"
								icon={GoProjectRoadmap}
								folders={foldersTest}
								lists={listsTest}
								tasks={tasksTest}
							/>
							<ProjectButton
								label="Project 3"
								icon={GoProjectRoadmap}
								folders={foldersTest}
								lists={listsTest}
								tasks={tasksTest}
							/>
						</div>
					</div>
				</div>

				{/* Bottom Menu Buttons */}

				<div className="space-y-2 py-4">
					<hr className="pt-2 border-white" />

					<SidebarButton icon={VscAccount} label="Account" />
					<SidebarButton icon={BiLogOutCircle} label="Log Out" />
				</div>
			</div>
		</div>
	);
};

export default SidebarComponent;
