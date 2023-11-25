import React, { useEffect } from "react";
import { useModel } from "../../contexts/ModelContext";
import { listTasksByListAxios } from "../../axios/ModelAxios";
import { useNavigate, useParams } from "react-router-dom";
import Task from "./components/Task";

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
		console.log("ListDisplay.jsx: useEffect called");

		listTasksByListAxios(setTasks, listId, navigate, projectId, folderId);
	}, [listId, navigate, projectId, folderId]);

	// useEffect(() => {
	// 	console.log("ListDisplay.jsx: useEffect called");
	// 	const fetchData = async () => {
	// 		try {
	// 			// Assuming listTasksByListAxios is an async function
	// 			const res = await listTasksByListAxios(
	// 				setTasks,
	// 				listId,
	// 				navigate,
	// 				projectId,
	// 				folderId
	// 			);
	// 			console.log("ListDisplay.jsx: listTasksByListAxios called");
	// 			console.log(res);
	// 			setTasks(res);
	// 			// console.log("ListDisplay.jsx: listTasksByListAxios called");
	// 		} catch (err) {
	// 			if (err.response && err.response.status === 401) {
	// 				try {
	// 					const refreshResponse = await axios.post(
	// 						"http://localhost:8000/api/v1/accounts/dj-rest-auth/token/refresh/",
	// 						{},
	// 						{
	// 							withCredentials: true,
	// 							headers: {
	// 								"X-CSRFToken": csrfToken,
	// 							},
	// 						}
	// 					);
	// 					const newAccessToken = refreshResponse.data.access;
	// 					localStorage.setItem("jwtToken", newAccessToken);
	// 					axios.defaults.headers.common["Authorization"] =
	// 						"Bearer " + newAccessToken;
	// 					fetchData(); // retry fetching user data with the new token
	// 				} catch (refreshErr) {
	// 					console.error("Error refreshing token", refreshErr);
	// 					navigate("/login");
	// 				}
	// 			} else {
	// 				console.error("Error fetching user data", err);
	// 			}
	// 		}
	// 	};

	// 	// Call the async function
	// 	fetchData();

	// 	// If you want to log the tasks, you should do it in a separate useEffect
	// 	// because tasks state update will not be reflected immediately after fetchData call
	// }, [listId, navigate, projectId, folderId]);

	return (
		<div
			className={`overflow-y-scroll min-h-full overflow-x-scroll bg-slate-300 m-4 `}
		>
			{tasks?.map((task, idx) => {
				return <Task key={idx} task={task} />;
			})}
		</div>
	);
};

export default ListDisplay;
