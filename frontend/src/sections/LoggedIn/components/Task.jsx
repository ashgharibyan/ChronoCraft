import React, { useEffect, useState } from "react";
import { formatDate } from "../../../axios/GeneralAxios";
import { IoFlagOutline, IoFlag } from "react-icons/io5";

const Task = (task) => {
	// const [isCompleted, setIsCompleted] = useState(completed);
	const [updatedTask, setUpdatedTask] = useState(task.task);
	const [isEditing, setIsEditing] = useState(false);

	const formattedDueDate = formatDate(task.task.due_date);
	const formattedCreatedAt = formatDate(task.task.created_at);
	const formattedUpdatedAt = formatDate(task.task.updated_at);

	useEffect(() => {
		setUpdatedTask({
			...updatedTask,
			due_date: formattedDueDate,
			created_at: formattedCreatedAt,
			updated_at: formattedUpdatedAt,
		});
	}, []);

	// const handleIsCompletedChange = () => {
	// 	setIsCompleted(!isCompleted);
	// 	// Add Axios to update database
	// };

	// const handleIsHighPriorityChange = () => {
	// 	setUpdatedTask({
	// 		...updatedTask,
	// 		high_priority: !updatedTask.high_priority,
	// 	});
	// 	// Add Axios to update database
	// };

	const handleDataChange = (e) => {
		if (e.target.name == "high_priority") {
			setUpdatedTask({
				...updatedTask,
				high_priority: !updatedTask.high_priority,
			});
		} else if (e.target.name == "completed") {
			setUpdatedTask({
				...updatedTask,
				completed: !updatedTask.completed,
			});
		} else {
			setUpdatedTask({
				...updatedTask,
				[e.target.name]: e.target.value,
			});
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
						value={updatedTask?.due_date}
						onChange={handleDataChange}
						readOnly={!isEditing}
					/>
					<input
						type="checkbox"
						name="completed"
						value={updatedTask?.completed}
						checked={updatedTask?.completed}
						onChange={handleDataChange}
					/>
					<button
						type="button"
						name="high_priority"
						onClick={handleDataChange}
					>
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
				<h1>Updated At: {updatedTask?.updated_at}</h1>
			</div>
			<button
				onClick={() => setIsEditing(!isEditing)}
				type="button"
				className="p-4 bg-yellow-500 text-white"
			>
				{isEditing ? "SUBMIT" : "EDIT"}
			</button>
		</div>
	);
};

export default Task;
