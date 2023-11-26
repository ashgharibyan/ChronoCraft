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

const ProjectsList = () => {
	const { user, setUser, projects, setProjects } = useGeneral();
	const navigate = useNavigate();

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
		<div className="min-h-full overflow-auto  bg-blue-500 flex flex-col justify-center items-center">
			<h1 className="text-3xl uppercase font-bold text-white p-4">
				Your Projects
			</h1>
			<Link to="/dashboard/create-project">
				<button className="bg-black text-white p-2 rounded-lg">
					Create A Project
				</button>
			</Link>
			{projects &&
				projects.map((project, idx) => (
					<div
						key={idx}
						className="bg-green-500 text-white text-center min-w-[500px] p-4 mx-4 mb-4 flex flex-col justify-center items-center gap-3"
					>
						<h1 className="text-2xl font-bold">{project.title}</h1>
						<p>{project.id}</p>
						<p>{project.description}</p>
						<p>{project.created_at}</p>
						<Link to={`/dashboard/project/${project.id}`}>
							<button className="bg-slate-500 text-white p-2 rounded-lg">
								Open Project
							</button>
						</Link>
					</div>
				))}
		</div>
	);
};

export default ProjectsList;
