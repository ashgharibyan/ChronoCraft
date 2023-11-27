import React, { useEffect } from "react";
import { useModel } from "../../contexts/ModelContext";
import { listTasksByListAxios } from "../../axios/ModelAxios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Task from "./components/Task";
import { useGeneral } from "../../contexts/GeneralContext";

const ListDisplay = () => {
	const navigate = useNavigate();
	const { selectedProject, selectedFolder, selectedList, setTasks, tasks } =
		useModel();

	const { triggerTasksListViewRefresh, setTriggerTasksListViewRefresh } =
		useGeneral();

	const { projectId, folderId, listId } = useParams();

	// useEffect(() => {
	// 	listTasksByListAxios(setTasks, listId, navigate, projectId folderId);

	// 	console.log("ListDisplay.jsx: listTasksByListAxios called");
	// 	console.log(tasks);
	// }, [listId, projectId, folderId]);

	// useEffect(() => {
	// 	console.log("ListDisplay.jsx: useEffect called");

	// 	listTasksByListAxios(setTasks, listId, navigate, projectId, folderId);
	// }, [listId, navigate, projectId, folderId]);

	useEffect(() => {
		console.log("ListDisplay.jsx: useEffect called");
		const fetchData = async () => {
			try {
				const res = await listTasksByListAxios(listId, navigate);
				if (res) {
					setTasks(res);
					console.log("ListDisplay.jsx: listTasksByListAxios called");
					console.log(res);
				}
			} catch (err) {
				console.error("Error in fetchData", err);
			}
		};

		fetchData();
		setTriggerTasksListViewRefresh(false);

		// If you want to log the tasks, you should do it in a separate useEffect
		// because tasks state update will not be reflected immediately after fetchData call
	}, [listId, navigate, projectId, folderId, triggerTasksListViewRefresh]);

	return (
		<div
			className={`overflow-y-scroll min-h-full overflow-x-scroll bg-slate-300 m-4 `}
		>
			<Link
				to={`/dashboard/${projectId}/${folderId}/${listId}/create-task`}
			>
				<button className="bg-black text-white p-2">
					Create A Task
				</button>
			</Link>
			{tasks.length > 0 ? (
				tasks?.map((task, idx) => {
					return (
						<Task
							key={idx}
							task={task}
							projectId={projectId}
							folderId={folderId}
							listId={listId}
						/>
					);
				})
			) : (
				<div className=" text-center">No tasks in this list</div>
			)}
		</div>
	);
};

export default ListDisplay;
