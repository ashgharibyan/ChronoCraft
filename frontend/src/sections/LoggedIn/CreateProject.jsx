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
		navigate("/dashboard");
	};

	return (
		<div>
			<h1>Create a project</h1>
			{newProjectErrors &&
				newProjectErrors.map((error, idx) => <p key={idx}>{error}</p>)}
			<form action="" onSubmit={handleCreateProject}>
				<label htmlFor="title">Project Title</label>
				<input
					type="text"
					name="title"
					id="title"
					value={newProjectData?.title}
					placeholder="Project Title"
					onChange={handleChange}
				/>
				<label htmlFor="description">Project Description</label>
				<input
					type="text"
					name="description"
					id="description"
					value={newProjectData?.description}
					placeholder="Project Description"
					onChange={handleChange}
				/>
				<button className="bg-black text-white p-4" type="submit">
					Create Project
				</button>
			</form>
		</div>
	);
};

export default CreateProject;
