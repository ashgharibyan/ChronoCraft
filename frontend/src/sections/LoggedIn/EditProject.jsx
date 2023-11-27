import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	getProjectByIdAxios,
	updateProjectByIdAxios,
} from "../../axios/ModelAxios";
import { useGeneral } from "../../contexts/GeneralContext";

const EditProject = () => {
	const { project_id } = useParams();
	const [project, setProject] = useState(null);
	const [projectErrors, setProjectErrors] = useState(null);
	const navigate = useNavigate();
	const {
		triggerTasksListViewRefresh,
		setTriggerTasksListViewRefresh,
		triggerSidebarRefresh,
		setTriggerSidebarRefresh,
		triggerSidebarFolderRefresh,
		setTriggerSidebarFolderRefresh,
		triggerSidebarListRefresh,
		setTriggerSidebarListRefresh,
		triggerSidebarTaskRefresh,
		setTriggerSidebarTaskRefresh,
	} = useGeneral();
	useEffect(() => {
		const fetchProjectData = async () => {
			try {
				const projectData = await getProjectByIdAxios(
					project_id,
					navigate
				);
				// Handle the project data
				setProject(projectData);
			} catch (error) {
				// Handle any errors
				console.error("Error fetching project data:", error);
			}
		};

		// Call the function
		fetchProjectData();
	}, [project_id]);

	const handleChange = (e) => {
		setProjectErrors([]);
		setProject({ ...project, [e.target.name]: e.target.value });
	};

	const handleProjectEditSubmit = (e) => {
		e.preventDefault();
		setProjectErrors([]);

		let errors = [];
		if (project.title === "") {
			errors.push("Title cannot be empty");
		} else if (project.title.length > 120) {
			errors.push("Project title cannot be longer than 120 characters");
		}

		if (project.description === "") {
			errors.push("Description cannot be empty");
		} else if (project.description.length > 225) {
			errors.push(
				"Project description cannot be longer than 255 characters"
			);
		}

		if (errors.length > 1) {
			setProjectErrors(errors);
			return;
		}

		updateProjectByIdAxios(project_id, project, navigate);
		setTriggerTasksListViewRefresh(true);
		setTriggerSidebarRefresh(true);
		setTriggerSidebarFolderRefresh(true);
		setTriggerSidebarListRefresh(true);
		setTriggerSidebarTaskRefresh(true);
		navigate(`/dashboard/project/${project_id}`);
	};

	return (
		<div>
			{projectErrors &&
				projectErrors.map((error, idx) => <p key={idx}>{error}</p>)}
			<form action="" onSubmit={handleProjectEditSubmit}>
				<label htmlFor="title">Title</label>
				<input
					type="text"
					name="title"
					id="title"
					onChange={handleChange}
					value={project?.title}
				/>
				<label htmlFor="description">Description</label>
				<input
					type="text"
					name="description"
					id="description"
					onChange={handleChange}
					value={project?.description}
				/>
				<button className="p-2 bg-black text-white" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
};

export default EditProject;
