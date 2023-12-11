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
		<div className="mx-8 my-4 text-gray-800 max-w-full text-sm lg:text-base flex flex-col gap-2 border-2 p-2 border-indigo-600 rounded-lg mt-2">
			<div className="flex justify-between w-full gap-2">
				<div className="flex-grow flex flex-col gap-3">
					<div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
						<div className=" w-full gap-2 flex  flex-col  border-0 p-2 border-indigo-600 rounded-lg bg-gray-50">
							{isEditing ? (
								<input
									name="name"
									type="text"
									value={updatedTask?.name}
									onChange={handleDataChange}
									className="text-lg lg:text-2xl"
								/>
							) : (
								<h1
									onDoubleClick={() =>
										setIsEditing(!isEditing)
									}
									className="text-lg lg:text-3xl font-bold"
								>
									{updatedTask?.name}
								</h1>
							)}
						</div>
						<div className="flex  justify-center items-center gap-2  font-bold  text-lg lg:text-2xl">
							<button
								onClick={handleEditSubmit}
								type="button"
								className="p-2 border-[1px] border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-lg  w-full"
							>
								{isEditing ? "SUBMIT" : "EDIT"}
							</button>
							<button
								type="button"
								onClick={handleDelete}
								className=" border-[1px] border-red-600 text-red-600 hover:bg-red-600 hover:text-white p-2 rounded-lg  w-full"
							>
								DELETE
							</button>
						</div>
					</div>

					<hr className="border-1 border-indigo-600" />

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
					<div className="flex justify-start items-center gap-2">
						<label htmlFor="due_date">Due:</label>
						<input
							id="due_date"
							name="due_date"
							type="datetime-local"
							value={
								updatedTask?.due_date
									? updatedTask?.due_date
									: ""
							}
							onChange={handleDataChange}
							readOnly={!isEditing}
							onDoubleClick={() => setIsEditing(!isEditing)}
							className="bg-gray-200 border-0 text-sm"
						/>
					</div>
					<div className="flex justify-start items-center gap-2">
						<label htmlFor="completed">Completed:</label>
						<input
							type="checkbox"
							name="completed"
							value={updatedTask?.completed}
							checked={updatedTask?.completed}
							onChange={handleIsCompletedChange}
						/>
					</div>
					<div className="flex justify-start items-center gap-2">
						<label>Priority:</label>
						<button
							type="button"
							onClick={handleIsHighPriorityChange}
						>
							{updatedTask?.high_priority ? (
								<IoFlag className="text-red-500" />
							) : (
								<IoFlagOutline />
							)}
						</button>
					</div>

					<hr className="border-1 border-indigo-600" />
					<div className="flex flex-col gap-2 border-0 p-2 border-indigo-600 rounded-lg bg-gray-50">
						<h1>Created At: {updatedTask?.created_at}</h1>
						<h1>Last Updated: {updatedTask?.updated_at}</h1>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Task;
