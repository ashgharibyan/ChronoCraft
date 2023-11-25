import React, { useEffect, useState } from "react";
import {
	convertLocalToISO,
	formatDate,
	formatDateToCustom,
} from "../../../axios/GeneralAxios";
import { IoFlagOutline, IoFlag } from "react-icons/io5";
import {
	getTaskByIdAxios,
	updateTaskByIdAxios,
} from "../../../axios/ModelAxios";
import { useNavigate } from "react-router-dom";

const Task = (task) => {
	const [isEditing, setIsEditing] = useState(false);
	const [updatedTask, setUpdatedTask] = useState(task.task);
	const [triggerUpdate, setTriggerUpdate] = useState(false);
	const [getTrigger, setGetTrigger] = useState(false);
	const [timeFormatTrigger, setTimeFormatTrigger] = useState(false);

	const navigate = useNavigate();

	// useEffect(() => {
	// 	console.log("Inside initial useEffect");
	// 	setUpdatedTask(task.task);

	// 	// setTimeFormatTrigger(true);
	// }, [task]);

	useEffect(() => {
		console.log("Inside timeFormatTrigger useEffect");
		const formattedCreatedAt = formatDateToCustom(task.task.created_at);
		const formattedUpdatedAt = formatDateToCustom(task.task.updated_at);

		if (task.task.due_date == null) {
			setUpdatedTask({
				...task.task,
				due_date: null,
				created_at: formattedCreatedAt,
				updated_at: formattedUpdatedAt,
			});
		} else {
			const formattedDueDate = formatDate(task.task.due_date);

			setUpdatedTask({
				...task.task,
				due_date: formattedDueDate,
				created_at: formattedCreatedAt,
				updated_at: formattedUpdatedAt,
			});
		}
	}, [task]);

	// Trigger tp update the task in the database
	useEffect(() => {
		console.log("Inside triggerUpdate useEffect");
		if (triggerUpdate) {
			updateTaskByIdAxios(updatedTask.id, updatedTask, navigate);
			setTriggerUpdate(false);
			setGetTrigger(true);
		}
	}, [updatedTask, triggerUpdate]);

	//After updating the task, get the updated task from the database
	// useEffect(() => {
	// 	console.log("Inside getTrigger useEffect");
	// 	if (getTrigger) {
	// 		getTaskByIdAxios(updatedTask.id, setUpdatedTask, navigate);
	// 		setGetTrigger(false);
	// 		setTimeFormatTrigger(true);
	// 	}
	// }, [getTrigger]);

	useEffect(() => {
		console.log("Inside getTrigger useEffect");

		let isMounted = true; // flag to track whether the component is mounted

		const fetchData = async () => {
			if (getTrigger) {
				try {
					// Assuming getTaskByIdAxios returns a promise
					const data = await getTaskByIdAxios(updatedTask.id);
					if (isMounted) {
						setUpdatedTask(data);
						setGetTrigger(false);
						setTimeFormatTrigger(true);
					}
				} catch (error) {
					console.error("Error fetching task data: ", error);
					// Handle error (e.g., show error message)
					if (isMounted) {
						setGetTrigger(false); // Reset trigger in case of error
						// Optionally, you can handle error state here
					}
				}
			}
		};

		fetchData();

		// Cleanup function to set the isMounted flag to false
		return () => {
			isMounted = false;
		};
	}, [getTrigger, updatedTask.id, setUpdatedTask, setTimeFormatTrigger]);

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
