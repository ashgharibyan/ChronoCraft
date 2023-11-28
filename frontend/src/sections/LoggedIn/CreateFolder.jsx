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
		navigate(`/dashboard/project/${project_id}/`);
	};

	return (
		<div className="bg-gray-50 h-full flex flex-col justify-center items-center   text-gray-700 ">
			<div className=" flex flex-col justify-center items-center gap-2">
				<h1 className="text-4xl uppercase">Create a folder</h1>
				<div className="py-2">
					{newFolderErrors &&
						newFolderErrors.map((error, idx) => (
							<p
								className="text-red-500 text-center font-bold"
								key={idx}
							>
								{error}
							</p>
						))}
				</div>
				<form
					className="flex flex-col justify-center items-center gap-4"
					action=""
					onSubmit={handleCreateFolder}
				>
					{/* <label htmlFor="name">Folder Name</label> */}
					<input
						type="text"
						name="name"
						id="name"
						value={newFolderData?.name}
						placeholder="Folder Name"
						onChange={handleChange}
					/>
					<button
						className="bg-gray-800 text-gray-50 hover:bg-indigo-500 px-8 py-4 uppercase rounded-md"
						type="submit"
					>
						Create Folder
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateFolder;
