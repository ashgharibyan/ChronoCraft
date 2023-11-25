import React, { useEffect } from "react";
import { useModel } from "../../contexts/ModelContext";
import { listTasksByListAxios } from "../../axios/ModelAxios";
import { useNavigate, useParams } from "react-router-dom";
import Task from "./components/Task";
import NewTask from "./components/NewTask";

const ListDisplay = () => {
	const navigate = useNavigate();
	const { selectedProject, selectedFolder, selectedList, setTasks, tasks } =
		useModel();

	const { projectId, folderId, listId } = useParams();

	// useEffect(() => {
	// 	listTasksByListAxios(setTasks, listId, navigate, projectId folderId);

	// 	console.log("ListDisplay.jsx: listTasksByListAxios called");
	// 	console.log(tasks);
	// }, [listId, projectId, folderId]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Assuming listTasksByListAxios is an async function
				const res = await listTasksByListAxios(
					setTasks,
					listId,
					navigate,
					projectId,
					folderId
				);
				setTasks(res);
				console.log("ListDisplay.jsx: listTasksByListAxios called");
			} catch (error) {
				console.error("Error fetching data: ", error);
				// Handle errors here, such as updating the UI accordingly
			}
		};

		// Call the async function
		fetchData();

		// If you want to log the tasks, you should do it in a separate useEffect
		// because tasks state update will not be reflected immediately after fetchData call
	}, [listId, navigate, projectId, folderId]);

	return (
		<div
			className={`overflow-y-scroll min-h-full overflow-x-scroll bg-slate-300 m-4 `}
		>
			{tasks?.map((task, idx) => {
				// return <Task key={idx} task={task} />;
				return <NewTask key={idx} task={task} />;
				// return <span>{task.name}</span>;
			})}
		</div>
	);
};

export default ListDisplay;
