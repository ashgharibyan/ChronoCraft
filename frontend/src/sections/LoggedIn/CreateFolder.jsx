import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGeneral } from "../../contexts/GeneralContext";
import { createFolderAxios } from "../../axios/ModelAxios";

const CreateFolder = () => {
	const { project_id } = useParams();
	const [newFolderData, setNewFolderData] = useState({
		name: "",
		parent_project: project_id,
	});

	const [newFolderErrors, setNewFolderErrors] = useState([]);
	const navigate = useNavigate();
	const { triggerSidebarFolderRefresh, setTriggerSidebarFolderRefresh } =
		useGeneral();

	const handleChange = (e) => {
		setNewFolderErrors([]);
		setNewFolderData({
			...newFolderData,
			[e.target.name]: e.target.value,
		});
	};

	const handleCreateFolder = (e) => {
		e.preventDefault();
		let errors = [];

		if (newFolderData.name === "") {
			errors = [...errors, "Folder name cannot be empty"];
		} else if (newFolderData.name.length > 100) {
			errors = [
				...errors,
				"Folder name cannot be longer than 100 characters",
			];
		}

		if (errors.length > 0) {
			setNewFolderErrors(errors);
			return;
		}

		//add axios call here
		createFolderAxios(newFolderData, navigate);
		setTriggerSidebarFolderRefresh(true);
		// navigate("/dashboard");
	};

	return (
		<div>
			<h1>Create a folder</h1>
			{newFolderErrors &&
				newFolderErrors.map((error, idx) => <p key={idx}>{error}</p>)}
			<form action="" onSubmit={handleCreateFolder}>
				<label htmlFor="name">Folder Name</label>
				<input
					type="text"
					name="name"
					id="name"
					value={newFolderData?.name}
					placeholder="Folder Name"
					onChange={handleChange}
				/>
				<button className="bg-black text-white p-4" type="submit">
					Create Folder
				</button>
			</form>
		</div>
	);
};

export default CreateFolder;
