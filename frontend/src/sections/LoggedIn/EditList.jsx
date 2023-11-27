import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getListByIdAxios, updateListByIdAxios } from "../../axios/ModelAxios";
import { useGeneral } from "../../contexts/GeneralContext";

const EditList = () => {
	const { project_id, folder_id, list_id } = useParams();
	const [list, setList] = useState({ parent_folder: folder_id });
	const [listErrors, setListErrors] = useState(null);
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
		const fetchListData = async () => {
			try {
				const listData = await getListByIdAxios(list_id, navigate);
				// Handle the list data
				setList(listData);
			} catch (error) {
				// Handle any errors
				console.error("Error fetching list data:", error);
			}
		};

		// Call the function
		fetchListData();
	}, [project_id, folder_id, list_id]);

	const handleChange = (e) => {
		setListErrors([]);
		setList({ ...list, [e.target.name]: e.target.value });
	};

	const handleListEditSubmit = (e) => {
		e.preventDefault();
		setListErrors([]);

		let errors = [];
		if (list.name === "") {
			errors.push("Name cannot be empty");
		} else if (list.name.length > 100) {
			errors.push("List name cannot be longer than 100 characters");
		}

		if (errors.length > 1) {
			setListErrors(errors);
			return;
		}

		updateListByIdAxios(list_id, list, navigate);
		setTriggerTasksListViewRefresh(true);
		setTriggerSidebarRefresh(true);
		setTriggerSidebarFolderRefresh(true);
		setTriggerSidebarListRefresh(true);
		setTriggerSidebarTaskRefresh(true);
		navigate(`/dashboard/${project_id}/${folder_id}/${list_id}`);
	};

	return (
		<div>
			{listErrors &&
				listErrors.map((error, idx) => <p key={idx}>{error}</p>)}
			<form action="" onSubmit={handleListEditSubmit}>
				<label htmlFor="name">Name</label>
				<input
					type="text"
					name="name"
					id="name"
					onChange={handleChange}
					value={list?.name}
				/>

				<button className="p-2 bg-black text-white" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
};

export default EditList;
