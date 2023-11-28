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
		<div className="bg-gray-50 h-full flex flex-col justify-center items-center gap-4  text-gray-700 ">
			<div className=" flex flex-col justify-center items-center gap-2">
				<h1 className="text-4xl uppercase">Create a list</h1>
				<div className="py-2">
					{newListErrors &&
						newListErrors.map((error, idx) => (
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
					onSubmit={handleCreateList}
				>
					{/* <label htmlFor="name">List Name:</label> */}
					<input
						type="text"
						name="name"
						id="name"
						value={newListData?.name}
						placeholder="List Name"
						onChange={handleChange}
					/>
					<button
						className="bg-gray-800 text-gray-50 hover:bg-indigo-500 px-8 py-4 uppercase rounded-md"
						type="submit"
					>
						Create List
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateList;
