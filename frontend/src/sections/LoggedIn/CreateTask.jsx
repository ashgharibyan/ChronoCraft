import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGeneral } from "../../contexts/GeneralContext";
import { createTaskAxios } from "../../axios/ModelAxios";

const CreateTask = () => {
	const { project_id, folder_id, list_id } = useParams();
	const [newTaskData, setNewTaskData] = useState({
		name: "",
		description: "",
		completed: false,
		due_date: null,
		high_priority: false,
		parent_list: list_id,
	});

	// name = models.CharField(max_length=150, blank=False, null=False)
	// parent_list = models.ForeignKey(List, on_delete=models.CASCADE, related_name="tasks")
	// description = models.TextField(max_length=500)
	// completed = models.BooleanField(default=False)
	// due_date = models.DateTimeField(blank=True, null=True)
	// high_priority = models.BooleanField(default=False)

	const [newTaskErrors, setNewTaskErrors] = useState([]);
	const navigate = useNavigate();
	const { triggerSidebarTaskRefresh, setTriggerSidebarTaskRefresh } =
		useGeneral();

	const handleChange = (e) => {
		setNewTaskErrors([]);
		setNewTaskData({
			...newTaskData,
			[e.target.name]: e.target.value,
		});
	};

	const handleCreateTask = (e) => {
		e.preventDefault();
		let errors = [];

		if (newTaskData.name === "") {
			errors = [...errors, "Task name cannot be empty"];
		} else if (newTaskData.name.length > 150) {
			errors = [
				...errors,
				"Task name cannot be longer than 150 characters",
			];
		}

		if (newTaskData.description === "") {
			errors = [...errors, "Task description cannot be empty"];
		} else if (newTaskData.description.length > 500) {
			errors = [
				...errors,
				"Task description cannot be longer than 500 characters",
			];
		}

		if (errors.length > 0) {
			setNewTaskErrors(errors);
			return;
		}
		//add axios call here
		createTaskAxios(newTaskData, navigate);
		setTriggerSidebarTaskRefresh(true);

		navigate(`/dashboard/${project_id}/${folder_id}/${list_id}`);
	};

	return (
		<div className="bg-gray-50 h-full flex flex-col justify-center items-center gap-4  text-gray-700 ">
			<div className=" flex flex-col justify-center items-center gap-2">
				<h1 className="text-4xl uppercase">Create a task</h1>
				<div className="py-2">
					{newTaskErrors &&
						newTaskErrors.map((error, idx) => (
							<p
								className="text-red-500 text-center font-bold"
								key={idx}
							>
								{error}
							</p>
						))}
				</div>
				<form
					className="flex flex-col justify-center items-center gap-4"
					action=""
					onSubmit={handleCreateTask}
				>
					{/* <label htmlFor="name">Task Name:</label> */}
					<input
						type="text"
						name="name"
						id="name"
						value={newTaskData?.name}
						placeholder="Task Name"
						onChange={handleChange}
					/>
					{/* <label htmlFor="description">Task Description:</label> */}
					<input
						type="text"
						name="description"
						id="description"
						value={newTaskData?.description}
						placeholder="Task Description"
						onChange={handleChange}
					/>
					<div className="flex gap-2 items-center justify-center">
						<label htmlFor="completed">Task Completed:</label>
						<input
							type="checkbox"
							name="completed"
							id="completed"
							value={newTaskData?.completed}
							placeholder="Task Completed"
							onChange={handleChange}
						/>
					</div>
					<div className="flex gap-2 items-center justify-center">
						<label htmlFor="due_date">Task Due Date:</label>
						<input
							type="datetime-local"
							name="due_date"
							id="due_date"
							value={
								newTaskData.due_date ? newTaskData.due_date : ""
							}
							placeholder="Task Due Date"
							onChange={handleChange}
						/>
					</div>
					<div className="flex gap-2 items-center justify-center">
						<label htmlFor="high_priority">
							Task High Priority:
						</label>
						<input
							type="checkbox"
							name="high_priority"
							id="high_priority"
							value={newTaskData?.high_priority}
							placeholder="Task High Priority"
							onChange={handleChange}
						/>
					</div>
					<button
						className="bg-gray-800 text-gray-50 hover:bg-indigo-500 px-8 py-4 uppercase rounded-md"
						type="submit"
					>
						Create Task
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateTask;
