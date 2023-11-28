import React, { useState } from "react";
import { createProjectAxios } from "../../axios/ModelAxios";
import { useNavigate } from "react-router-dom";
import { useGeneral } from "../../contexts/GeneralContext";

const CreateProject = () => {
	const [newProjectData, setNewProjectData] = useState({
		title: "",
		description: "",
	});

	const [newProjectErrors, setNewProjectErrors] = useState([]);
	const navigate = useNavigate();
	const { triggerSidebarRefresh, setTriggerSidebarRefresh } = useGeneral();

	const handleChange = (e) => {
		setNewProjectErrors([]);
		setNewProjectData({
			...newProjectData,
			[e.target.name]: e.target.value,
		});
	};

	const handleCreateProject = (e) => {
		e.preventDefault();
		let errors = [];

		if (newProjectData.title === "") {
			errors = [...errors, "Project title cannot be empty"];
		} else if (newProjectData.title.length > 120) {
			errors = [
				...errors,
				"Project title cannot be longer than 120 characters",
			];
		}

		if (newProjectData.description === "") {
			errors = [...errors, "Project description cannot be empty"];
		} else if (newProjectData.description.length > 255) {
			errors = [
				...errors,
				"Project description cannot be longer than 255 characters",
			];
		}

		if (errors.length > 0) {
			setNewProjectErrors(errors);
			return;
		}

		console.log(newProjectData);

		createProjectAxios(newProjectData, navigate);
		setTriggerSidebarRefresh(true);
		navigate("/dashboard/projects-overview/");
	};

	return (
		<div className="bg-gray-50 h-full flex flex-col justify-center items-center gap-4  text-gray-700 ">
			<div className=" flex flex-col justify-center items-center gap-2">
				<h1 className="text-4xl uppercase">
					<span className="hover:text-indigo-500">Create</span>{" "}
					<span className="hover:text-indigo-500">a</span>
					{"  "}
					<span className="hover:text-indigo-500">project</span>
				</h1>
				<div className="py-2">
					{newProjectErrors &&
						newProjectErrors.map((error, idx) => (
							<p
								className="  text-red-500 text-center font-bold"
								key={idx}
							>
								{error}
							</p>
						))}
				</div>
				<form
					className="flex flex-col justify-center items-center gap-4"
					action=""
					onSubmit={handleCreateProject}
				>
					{/* <label htmlFor="title">Project Title</label> */}
					<input
						type="text"
						name="title"
						id="title"
						value={newProjectData?.title}
						placeholder="Project Title"
						onChange={handleChange}
					/>
					{/* <label htmlFor="description">Project Description</label> */}
					<input
						type="text"
						name="description"
						id="description"
						value={newProjectData?.description}
						placeholder="Project Description"
						onChange={handleChange}
					/>
					<button
						className="bg-gray-800 text-gray-50 hover:bg-indigo-500 px-8 py-4 uppercase rounded-md"
						type="submit"
					>
						Create
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateProject;
