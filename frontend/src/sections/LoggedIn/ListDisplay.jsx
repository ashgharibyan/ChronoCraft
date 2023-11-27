import React, { useEffect, useState } from "react";
import { useModel } from "../../contexts/ModelContext";
import { getListByIdAxios, listTasksByListAxios } from "../../axios/ModelAxios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Task from "./components/Task";
import { useGeneral } from "../../contexts/GeneralContext";

const ListDisplay = () => {
	const navigate = useNavigate();
	const { selectedProject, selectedFolder, selectedList, setTasks, tasks } =
		useModel();

	const { triggerTasksListViewRefresh, setTriggerTasksListViewRefresh } =
		useGeneral();

	const [currentList, setCurrentList] = useState();
	const { projectId, folderId, listId } = useParams();
	const [isLoading, setIsLoading] = useState(true);

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
		const fetchListData = async () => {
			try {
				const listData = await getListByIdAxios(listId, navigate);
				// Handle the list data
				setCurrentList(listData);
			} catch (error) {
				// Handle any errors
				console.error("Error fetching list data:", error);
			}
		};

		// Call the function
		fetchListData();

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
		setIsLoading(false);
		// If you want to log the tasks, you should do it in a separate useEffect
		// because tasks state update will not be reflected immediately after fetchData call
	}, [listId, projectId, folderId, triggerTasksListViewRefresh]);

	return (
		<div
			className={`overflow-y-scroll min-h-full overflow-x-scroll bg-slate-300 m-4 `}
		>
			{isLoading ? (
				<h1>Loading...</h1>
			) : (
				<div>
					<h1>List: {currentList?.name}</h1>
					<Link
						to={`/dashboard/${projectId}/${folderId}/${listId}/create-task`}
					>
						<button className="bg-black text-white p-2">
							Create A Task
						</button>
					</Link>
					<Link
						to={`/dashboard/project/${projectId}/folder/${folderId}/list/${listId}/edit`}
					>
						<button className="bg-black text-white p-2">
							Edit The List
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
						<div className=" text-center">
							No tasks in this list
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default ListDisplay;
