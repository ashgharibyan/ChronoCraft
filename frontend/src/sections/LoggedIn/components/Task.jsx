import React, { useEffect, useState } from "react";
import {
	convertLocalToISO,
	formatDate,
	formatDateToCustom,
} from "../../../axios/GeneralAxios";
import { IoFlagOutline, IoFlag } from "react-icons/io5";
import {
	deleteTaskByIdAxios,
	getTaskByIdAxios,
	updateTaskByIdAxios,
} from "../../../axios/ModelAxios";
import { useNavigate } from "react-router-dom";
import { useGeneral } from "../../../contexts/GeneralContext";

const Task = ({ task, projectId, folderId, listId }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [updatedTask, setUpdatedTask] = useState({
		name: "",
		due_date: null,
		completed: false,
		high_priority: false,
		description: "",
		created_at: "",
		updated_at: "",
		// ... any other fields that your task might have
	});
	const [triggerUpdate, setTriggerUpdate] = useState(false);
	const [getTrigger, setGetTrigger] = useState(false);
	const [timeFormatTrigger, setTimeFormatTrigger] = useState(false);

	const navigate = useNavigate();

	const {
		triggerTasksListViewRefresh,
		setTriggerTasksListViewRefresh,
		setTriggerTasksRefreshInListDisplay,
		triggerTasksRefreshInListDisplay,
	} = useGeneral();

	useEffect(() => {
		const formattedCreatedAt = formatDateToCustom(task.created_at);
		const formattedUpdatedAt = formatDateToCustom(task.updated_at);

		setUpdatedTask((prevState) => ({
			...prevState,
			...task,
			due_date: task.due_date == null ? "" : formatDate(task.due_date),
			created_at: formattedCreatedAt,
			updated_at: formattedUpdatedAt,
		}));
	}, [task]);

	// // getting the task by id
	useEffect(() => {
		const fetchData = async () => {
			try {
				// Assuming getTaskByIdAxios returns a promise
				const data = await getTaskByIdAxios(task.id, navigate);
				setUpdatedTask(data);
				setGetTrigger(false);
			} catch (error) {
				console.error("Error fetching task data: ", error);
				// Handle error (e.g., show error message)
				setGetTrigger(false); // Reset trigger in case of error
				// Optionally, you can handle error state here
			}
		};

		fetchData();
	}, [getTrigger]);

	// Updating the task
	useEffect(() => {
		if (triggerUpdate) {
			updateTaskByIdAxios(
				updatedTask.id,
				updatedTask,
				navigate,
				setTriggerTasksRefreshInListDisplay,
				triggerTasksRefreshInListDisplay
			);
			setTriggerUpdate(false);
			setGetTrigger(true);
		}
	}, [triggerUpdate, updatedTask]);

	const handleIsCompletedChange = () => {
		setUpdatedTask({
			...updatedTask,
			completed: !updatedTask.completed,
		});
		setTriggerUpdate(true);
	};

	const handleIsHighPriorityChange = () => {
		setUpdatedTask({
			...updatedTask,
			high_priority: !updatedTask.high_priority,
		});
		setTriggerUpdate(true);
	};

	const handleDataChange = (e) => {
		if (e.target.name == "due_date" && e.target.value == "") {
			setUpdatedTask({
				...updatedTask,
				due_date: null,
			});
		} else {
			setUpdatedTask({
				...updatedTask,
				[e.target.name]: e.target.value,
			});
		}
	};

	const handleEditSubmit = (e) => {
		e.preventDefault();
		if (e.target.textContent == "EDIT") {
			setIsEditing(!isEditing);
		} else {
			setIsEditing(!isEditing);
			if (updatedTask.due_date != null) {
				const isoDueDate = convertLocalToISO(updatedTask.due_date);
				setUpdatedTask({
					...updatedTask,
					due_date: isoDueDate,
				});
			}
			setTriggerUpdate(true);
		}
	};

	const handleDelete = (e) => {
		e.preventDefault();

		// Delete the task
		deleteTaskByIdAxios(updatedTask.id, navigate);
		setTriggerTasksListViewRefresh(true);
		navigate(`/dashboard/${projectId}/${folderId}/${listId}`);
	};

	return (
		<div className="m-4 p-4 bg-white text-black w-[75%] text-base flex flex-col gap-2">
			<div className="bg-gray-200 text-lg p-4 font-bold uppercase flex justify-between items-center">
				{isEditing ? (
					<input
						name="name"
						type="text"
						value={updatedTask?.name}
						onChange={handleDataChange}
					/>
				) : (
					<h1 onDoubleClick={() => setIsEditing(!isEditing)}>
						{updatedTask?.name}
					</h1>
				)}
				<div className="flex justify-between items-center gap-4">
					<label htmlFor="due_date">Due:</label>
					<input
						id="due_date"
						name="due_date"
						type="datetime-local"
						value={
							updatedTask?.due_date ? updatedTask?.due_date : ""
						}
						onChange={handleDataChange}
						readOnly={!isEditing}
						onDoubleClick={() => setIsEditing(!isEditing)}
					/>
					<input
						type="checkbox"
						name="completed"
						value={updatedTask?.completed}
						checked={updatedTask?.completed}
						onChange={handleIsCompletedChange}
					/>
					<button type="button" onClick={handleIsHighPriorityChange}>
						{updatedTask?.high_priority ? (
							<IoFlag className="text-red-500" />
						) : (
							<IoFlagOutline />
						)}
					</button>

					<button type="button" onClick={handleDelete}>
						Delete Task
					</button>
				</div>
			</div>
			{isEditing ? (
				<input
					type="text"
					name="description"
					value={updatedTask?.description}
					onChange={handleDataChange}
				/>
			) : (
				<h1 onDoubleClick={() => setIsEditing(!isEditing)}>
					Description: {updatedTask?.description}
				</h1>
			)}
			<div className="flex justify-between items-center">
				<h1>Created At: {updatedTask?.created_at}</h1>
				<h1>Last Updated: {updatedTask?.updated_at}</h1>
			</div>
			<button
				onClick={handleEditSubmit}
				type="button"
				className="p-4 bg-yellow-500 text-white"
			>
				{isEditing ? "SUBMIT" : "EDIT"}
			</button>
		</div>
	);
};

export default Task;
