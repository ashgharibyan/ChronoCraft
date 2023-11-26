import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGeneral } from "../../contexts/GeneralContext";
import { createListAxios } from "../../axios/ModelAxios";

const CreateList = () => {
	const { project_id, folder_id } = useParams();
	const [newListData, setNewListData] = useState({
		name: "",
		parent_folder: folder_id,
	});

	const [newListErrors, setNewListErrors] = useState([]);
	const navigate = useNavigate();
	const { triggerSidebarListRefresh, setTriggerSidebarListRefresh } =
		useGeneral();

	const handleChange = (e) => {
		setNewListErrors([]);
		setNewListData({
			...newListData,
			[e.target.name]: e.target.value,
		});
	};

	const handleCreateList = (e) => {
		e.preventDefault();
		let errors = [];

		if (newListData.name === "") {
			errors = [...errors, "List name cannot be empty"];
		} else if (newListData.name.length > 100) {
			errors = [
				...errors,
				"List name cannot be longer than 100 characters",
			];
		}

		if (errors.length > 0) {
			setNewListErrors(errors);
			return;
		}

		//add axios call here
		createListAxios(newListData, navigate);
		setTriggerSidebarListRefresh(true);
		navigate(`/dashboard/project/${project_id}/folder/${folder_id}`);
	};

	return (
		<div>
			<h1>Create a list</h1>
			{newListErrors &&
				newListErrors.map((error, idx) => <p key={idx}>{error}</p>)}
			<form action="" onSubmit={handleCreateList}>
				<label htmlFor="name">List Name:</label>
				<input
					type="text"
					name="name"
					id="name"
					value={newListData?.name}
					placeholder="List Name"
					onChange={handleChange}
				/>
				<button className="bg-black text-white p-4" type="submit">
					Create List
				</button>
			</form>
		</div>
	);
};

export default CreateList;
