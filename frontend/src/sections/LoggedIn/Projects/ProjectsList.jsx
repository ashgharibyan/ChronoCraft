import React, { useEffect, useState } from "react";
import { useGeneral } from "../../../contexts/GeneralContext";
import {
	fetchUserData,
	getCookie,
	projectsAxios,
} from "../../../axios/GeneralAxios";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { listProjectsAxios } from "../../../axios/ModelAxios";
import ProjectCard from "../components/ProjectCard";
import { BsPlusCircle } from "react-icons/bs";

const ProjectsList = () => {
	const { user, setUser, projects, setProjects } = useGeneral();
	const navigate = useNavigate();
	const [projectEditToggle, setProjectEditToggle] = useState(false);

	useEffect(() => {
		const jwtToken = localStorage.getItem("jwtToken");

		if (jwtToken) {
			axios.defaults.headers.common["Authorization"] =
				"Bearer " + jwtToken;
			fetchUserData(setUser, navigate);
		} else {
			navigate("/login");
		}

		listProjectsAxios(setProjects, navigate);
	}, []);

	return (
		<div className="p-4 min-h-full overflow-auto bg-gray-50 flex flex-col justify-center items-center gap-6">
			<div className="flex flex-col justify-between items-center w-full ">
				<h1 className="text-4xl uppercase font-bold text-gray-700 hover:text-indigo-500 ">
					My Projects
				</h1>
				<Link to="/dashboard/create-project">
					<div className="flex items-center gap-2 text-gray-500 hover:text-indigo-500 ">
						<button className="p-2 rounded-lg uppercase ">
							Create A Project
						</button>
						<BsPlusCircle className="h-6 w-6" />
					</div>
				</Link>
			</div>
			<div className="grid md:grid-cols-2 gap-4">
				{projects &&
					projects.map((project, idx) => (
						<ProjectCard key={idx} project={project} />
					))}
			</div>
		</div>
	);
};

export default ProjectsList;
