import React, { useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import axios from "axios";
import { useModel } from "../../contexts/ModelContext";
import {
	listProjectsAxios,
	listFolderByProjectAxios,
	listListsByFolderAxios,
} from "../../axios/ModelAxios";

const SidebarComponent = () => {
	const foldersTest = ["Folder 1", "Folder 2", "Folder 3"];
	const listsTest = ["List 1", "List 2", "List 3"];
	const tasksTest = ["Task 1", "Task 2", "Task 3"];
	const {
		toggleSidebar,
		setToggleSidebar,
		setWasToggledManually,
		toggleProfile,
		setToggleProfile,
		triggerSidebarRefresh,
		setTriggerSidebarRefresh,
		triggerSidebarFolderRefresh,
		setTriggerSidebarFolderRefresh,
		triggerSidebarListRefresh,
		setTriggerSidebarListRefresh,
	} = useGeneral();
	const navigate = useNavigate();
	const { logOut } = useUser();
	const {
		projects,
		setProjects,
		folders,
		setFolders,
		lists,
		setLists,
		setSelectedProject,
		selectedProject,
		selectedFolder,
		setSelectedFolder,
	} = useModel();
	const { projectArrowClicked, setProjectArrowClicked } = useGeneral();
	// const [openProjectId, setOpenProjectId] = useState(null);

	useEffect(() => {
		if (triggerSidebarRefresh) {
			listProjectsAxios(setProjects, navigate);
			setTriggerSidebarRefresh(false);
		}
	}, [triggerSidebarRefresh]);

	useEffect(() => {
		if (triggerSidebarFolderRefresh) {
			const fetchFoldersData = async () => {
				try {
					const foldersData = await listFolderByProjectAxios(
						selectedProject,
						navigate
					);
					// Handle the project data
					setFolders(foldersData);
				} catch (error) {
					// Handle any errors
					console.error("Error fetching folder data:", error);
				}
			};

			// Call the function
			fetchFoldersData();
			setTriggerSidebarFolderRefresh(false);
		}
	}, [triggerSidebarFolderRefresh]);

	useEffect(() => {
		if (triggerSidebarListRefresh) {
			const fetchListsData = async () => {
				try {
					const listsData = await listListsByFolderAxios(
						selectedFolder.id,
						navigate
					);
					// Handle the project data
					setLists(listsData);
				} catch (error) {
					// Handle any errors
					console.error("Error fetching list data:", error);
				}
			};

			// Call the function
			fetchListsData();
			setTriggerSidebarListRefresh(false);
		}
	}, [triggerSidebarListRefresh]);

	const handleProjectOpen = (projectId) => {
		if (selectedProject === projectId) {
			setSelectedProject(null); // Close the project if it's already open
		} else {
			const project_id = projectId;
			setSelectedProject(projectId); // Open the new project
			const fetchFoldersData = async () => {
				try {
					const foldersData = await listFolderByProjectAxios(
						project_id,
						navigate
					);
					// Handle the project data
					setFolders(foldersData);
				} catch (error) {
					// Handle any errors
					console.error("Error fetching project data:", error);
				}
			};

			// Call the function
			fetchFoldersData();
		}

		setProjectArrowClicked(!projectArrowClicked);
		navigate(`/dashboard/project/${projectId}`);
	};

	const handleSidebarToggleButton = () => {
		setToggleSidebar(!toggleSidebar);
		setWasToggledManually(true);
	};

	function getCookie(name) {
		let value = "; " + document.cookie;
		let parts = value.split("; " + name + "=");
		if (parts.length === 2) return parts.pop().split(";").shift();
	}
	const clearAuthenticationData = () => {
		// Clear local storage
		localStorage.removeItem("jwtToken");
		// Clear all cookies
		axios.defaults.headers.common["Authorization"] = null;
		document.cookie.split(";").forEach((c) => {
			document.cookie = c
				.replace(/^ +/, "")
				.replace(
					/=.*/,
					"=;expires=" + new Date().toUTCString() + ";path=/"
				);
		});
	};

	const logoutAxios = async () => {
		try {
			const csrfToken = getCookie("csrftoken");

			const response = await axios.post(
				"http://localhost:8000/api/v1/accounts/dj-rest-auth/logout/",
				{},
				{
					withCredentials: true,
					headers: {
						"X-CSRFToken": csrfToken,
					},
				}
			);

			console.log("Successfully logged out");
			clearAuthenticationData();

			// logOut();
			navigate("/");
		} catch (error) {
			if (error.response && error.response.status === 401) {
				try {
					const csrfToken = getCookie("csrftoken");

					const refreshResponse = await axios.post(
						"http://localhost:8000/api/v1/accounts/dj-rest-auth/token/refresh/",
						{},
						{
							withCredentials: true,
							headers: {
								"X-CSRFToken": csrfToken,
							},
						}
					);
					const newAccessToken = refreshResponse.data.access;
					localStorage.setItem("jwtToken", newAccessToken);
					axios.defaults.headers.common["Authorization"] =
						"Bearer " + newAccessToken;
					logoutAxios(); // retry fetching user data with the new token
				} catch (refreshErr) {
					console.log("Error refreshing token", refreshErr);
					navigate("/login");
				}
			} else {
				console.log("Error logging out", error);
			}
		}
	};

	const handleLogout = () => {
		logoutAxios();
		logOut();
	};

	return (
		<div
			// className={`border-r-[1px]  max-h-screen border-white min-w-[300px] bg-gradient-to-tr from-indigo-800 to-indigo-600 flex flex-col shadow-lg shadow-black`}
			className={` overflow-y-auto border-r-[1px]  max-h-screen border-white min-w-[300px] bg-gradient-to-tr from-indigo-800 to-indigo-600 flex flex-col shadow-lg shadow-black`}
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
						<div>
							<Link to="/dashboard">
								<SidebarButton
									icon={MdSpaceDashboard}
									label="Dashboard"
								/>
							</Link>
						</div>
						<div>
							<Link to="/dashboard/projects-overview/">
								<SidebarButton
									icon={SiCodereview}
									label="Projects Overview"
								/>
							</Link>
						</div>
						{/* <div>
							<Link to="/dashboard/projects-overview/">
								<SidebarButton
									icon={BsCalendarRange}
									label="Calendar"
								/>
							</Link>
						</div>
						<div>
							<Link to="/dashboard/projects-overview/">
								<SidebarButton
									icon={IoSettingsOutline}
									label="Settings"
								/>
							</Link>
						</div>
						<div>
							<Link to="/dashboard/projects-overview/">
								<SidebarButton icon={LuGoal} label="Goals" />
							</Link>
						</div> */}
					</div>
					<hr className=" border-white" />

					{/* Projects */}
					<div className="space-y-2 ">
						<div className="flex justify-between items-center  px-4 py-2 pt-4">
							<h3 className="text-white uppercase text-lg font-bold ">
								My Projects
							</h3>

							<Link to="/dashboard/create-project">
								<BsPlusCircle className="h-4 w-4 text-white " />
							</Link>
						</div>
						{/* <div className="space-y-1 overflow-y-scroll max-h-[425px] "> */}
						<div className="space-y-1 overflow-y-scroll min-h-[200px] max-h-[calc(100vh-450px)] ">
							{projects &&
								projects.map((project, idx) => (
									<ProjectButton
										label={project.title}
										key={idx}
										project_id={project.id}
										icon={GoProjectRoadmap}
										folders={folders}
										lists={lists}
										tasks={tasksTest}
										isOpen={selectedProject === project.id}
										onProjectClick={() =>
											handleProjectOpen(project.id)
										}
									/>
								))}
						</div>
					</div>
				</div>

				{/* Bottom Menu Buttons */}

				<div className="space-y-2 py-4">
					<hr className="pt-2 border-white" />
					<Link to="/dashboard/profile/">
						<SidebarButton icon={VscAccount} label="Account" />
					</Link>
					<Link onClick={handleLogout}>
						<SidebarButton icon={BiLogOutCircle} label="Log Out" />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SidebarComponent;
