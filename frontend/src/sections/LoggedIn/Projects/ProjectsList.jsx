import React, { useEffect, useState } from "react";
import { useGeneral } from "../../../contexts/GeneralContext";
import {
	fetchUserData,
	getCookie,
	projectsAxios,
} from "../../../axios/GeneralAxios";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// const dummyProjects = [
// 	{
// 		owner: 1,
// 		title: "Todo App",
// 		description: "A simple todo app",
// 		created_at: "2021-07-20T11:00:00.000Z",
// 		folders: [
// 			{
// 				name: "Week 1",
// 				tasks: [
// 					{
// 						name: "Task 1",
// 						description: "This is a task",
// 						due_date: "2021-07-20T11:00:00.000Z",
// 						completed: false,
// 					},
// 				],
// 			},
// 		],
// 	},
// 	{
// 		owner: 1,
// 		title: "News App",
// 		description: "A simple news app",
// 		created_at: "2021-07-20T11:00:00.000Z",
// 		folders: [
// 			{
// 				name: "Planning",
// 				tasks: [
// 					{
// 						name: "Task 1",
// 						description: "This is a news task",
// 						due_date: "2021-07-20T11:00:00.000Z",
// 						completed: true,
// 					},
// 				],
// 			},
// 		],
// 	},
// 	{
// 		owner: 1,
// 		title: "Todo App",
// 		description: "A simple todo app",
// 		created_at: "2021-07-20T11:00:00.000Z",
// 		folders: [
// 			{
// 				name: "Week 1",
// 				tasks: [
// 					{
// 						name: "Task 1",
// 						description: "This is a task",
// 						due_date: "2021-07-20T11:00:00.000Z",
// 						completed: false,
// 					},
// 				],
// 			},
// 		],
// 	},
// 	{
// 		owner: 1,
// 		title: "News App",
// 		description: "A simple news app",
// 		created_at: "2021-07-20T11:00:00.000Z",
// 		folders: [
// 			{
// 				name: "Planning",
// 				tasks: [
// 					{
// 						name: "Task 1",
// 						description: "This is a news task",
// 						due_date: "2021-07-20T11:00:00.000Z",
// 						completed: true,
// 					},
// 				],
// 			},
// 		],
// 	},
// ];

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

		projectsAxios(setProjects, navigate);
	}, []);

	return (
		<div className="min-h-full overflow-auto  bg-blue-500 flex flex-col justify-center items-center">
			<h1 className="text-3xl uppercase font-bold text-white p-4">
				Your Projects
			</h1>
			{projects.map((project, idx) => (
				<div
					key={idx}
					className="bg-green-500 text-white text-center min-w-[500px] p-4 mx-4 mb-4 flex flex-col justify-center items-center gap-3"
				>
					<h1 className="text-2xl font-bold">{project.title}</h1>
					<p>{project.id}</p>
					<p>{project.description}</p>
					<p>{project.created_at}</p>
					<button className="bg-slate-500 text-white p-2 rounded-lg">
						Open Project
					</button>
				</div>
			))}
		</div>
	);
};

export default ProjectsList;
