import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTaskByIdAxios } from "../../axios/ModelAxios";
import Task from "./components/Task";

const DisplayTask = () => {
	const { task_id, list_id, folder_id, project_id } = useParams();
	const [currentTask, setCurrentTask] = useState();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchTaskData = async () => {
			try {
				const taskData = await getTaskByIdAxios(task_id, navigate);
				// Handle the task data
				// console.log("DisplayTask.jsx: taskData==================");
				// console.log(taskData);
				setCurrentTask(taskData);
				setIsLoading(false);
			} catch (error) {
				// Handle any errors
				console.error("Error fetching task data:", error);
			}
		};

		// Call the function
		fetchTaskData();
	}, [task_id]);

	return (
		<div>
			{isLoading ? (
				<div className="flex justify-center items-center h-full w-full">
					<h1>Loading...</h1>
				</div>
			) : (
				<Task
					task={currentTask}
					projectId={project_id}
					folderId={folder_id}
					listId={list_id}
				/>
			)}
		</div>
	);
};

export default DisplayTask;
