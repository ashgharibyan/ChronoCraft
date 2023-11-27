import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	getFolderByIdAxios,
	updateFolderByIdAxios,
} from "../../axios/ModelAxios";
import { useGeneral } from "../../contexts/GeneralContext";

const EditFolder = () => {
	const { project_id, folder_id } = useParams();
	const [folder, setFolder] = useState({ parent_project: project_id });
	const [folderErrors, setFolderErrors] = useState(null);
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
		const fetchFolderData = async () => {
			try {
				const folderData = await getFolderByIdAxios(
					folder_id,
					navigate
				);
				// Handle the folder data
				setFolder(folderData);
			} catch (error) {
				// Handle any errors
				console.error("Error fetching folder data:", error);
			}
		};

		// Call the function
		fetchFolderData();
	}, [project_id, folder_id]);

	const handleChange = (e) => {
		setFolderErrors([]);
		setFolder({ ...folder, [e.target.name]: e.target.value });
	};

	const handleFolderEditSubmit = (e) => {
		e.preventDefault();
		setFolderErrors([]);

		let errors = [];
		if (folder.name === "") {
			errors.push("Name cannot be empty");
		} else if (folder.name.length > 100) {
			errors.push("Folder name cannot be longer than 100 characters");
		}

		if (errors.length > 1) {
			setFolderErrors(errors);
			return;
		}

		updateFolderByIdAxios(folder_id, folder, navigate);
		setTriggerTasksListViewRefresh(true);
		setTriggerSidebarRefresh(true);
		setTriggerSidebarFolderRefresh(true);
		setTriggerSidebarListRefresh(true);
		setTriggerSidebarTaskRefresh(true);
		navigate(`/dashboard/project/${project_id}/folder/${folder_id}`);
	};

	return (
		<div>
			{folderErrors &&
				folderErrors.map((error, idx) => <p key={idx}>{error}</p>)}
			<form action="" onSubmit={handleFolderEditSubmit}>
				<label htmlFor="name">Name</label>
				<input
					type="text"
					name="name"
					id="name"
					onChange={handleChange}
					value={folder?.name}
				/>

				<button className="p-2 bg-black text-white" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
};

export default EditFolder;
