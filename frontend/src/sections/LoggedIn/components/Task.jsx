import React, { useState } from "react";
import { formatDate } from "../../../axios/GeneralAxios";
import { IoFlagOutline, IoFlag } from "react-icons/io5";

const Task = (task) => {
	const {
		id,
		name,
		description,
		completed,
		due_date,
		high_priority,
		created_at,
		updated_at,
	} = task.task;

	const formattedDueDate = formatDate(due_date);
	const formattedCreatedAt = formatDate(created_at);
	const formattedUpdatedAt = formatDate(updated_at);

	const [isCompleted, setIsCompleted] = useState(completed);
	const [updatedTask, setUpdatedTask] = useState(task.task);
	const [isEditing, setIsEditing] = useState(false);

	const handleIsCompletedChange = () => {
		setIsCompleted(!isCompleted);
		// Add Axios to update database
	};

	const handleIsHighPriorityChange = () => {
		setUpdatedTask({
			...updatedTask,
			high_priority: !updatedTask.high_priority,
		});
		// Add Axios to update database
	};

	return (
		<div className="m-4 p-4 bg-white text-black w-[75%] text-base flex flex-col gap-2">
			<div className="bg-gray-200 text-lg p-4 font-bold uppercase flex justify-between items-center">
				{isEditing ? (
					<input type="text" value={updatedTask.name} />
				) : (
					<h1>{updatedTask.name}</h1>
				)}
				<div className="flex justify-between items-center gap-4">
					<h1>Due: {formattedDueDate}</h1>
					<input
						type="checkbox"
						checked={isCompleted}
						onChange={handleIsCompletedChange}
					/>
					<button type="button" onClick={handleIsHighPriorityChange}>
						{updatedTask.high_priority ? (
							<IoFlag className="text-red-500" />
						) : (
							<IoFlagOutline />
						)}
					</button>
				</div>
			</div>

			<h1>Description: {description}</h1>

			<div className="flex justify-between items-center">
				<h1>Created At: {formattedCreatedAt}</h1>
				<h1>Updated At: {formattedUpdatedAt}</h1>
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
