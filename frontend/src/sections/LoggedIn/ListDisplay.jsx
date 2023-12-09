import React, { useEffect, useState } from "react";
import { useModel } from "../../contexts/ModelContext";
import {
	getListByIdAxios,
	listTasksByListAxios,
	updateListByIdAxios,
} from "../../axios/ModelAxios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Task from "./components/Task";
import { useGeneral } from "../../contexts/GeneralContext";
import { BsPlusCircle } from "react-icons/bs";
import { FaRegCheckCircle, FaEdit } from "react-icons/fa";

const ListDisplay = () => {
	const navigate = useNavigate();
	const { selectedProject, selectedFolder, selectedList, setTasks, tasks } =
		useModel();

	const [currentList, setCurrentList] = useState();
	const [editToggle, setEditToggle] = useState(false);
	const [listErrors, setListErrors] = useState(null);

	const { projectId, folderId, listId } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const {
		triggerTasksListViewRefresh,
		setTriggerTasksListViewRefresh,
		triggerSidebarRefresh,
		setTriggerSidebarRefresh,
		triggerSidebarFolderRefresh,
		setTriggerSidebarFolderRefresh,
		triggerSidebarListRefresh,
		setTriggerSidebarListRefresh,
		triggerSidebarTaskRefresh,
		setTriggerSidebarTaskRefresh,
	} = useGeneral();
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
		// setIsLoading(false);
	}, [listId]);

	const handleChange = (e) => {
		setListErrors([]);
		setCurrentList({
			...currentList,
			[e.target.name]: e.target.value,
		});
	};

	const handleEditChanges = (e) => {
		e.preventDefault();
		setListErrors([]);

		let errors = [];
		if (currentList.name === "") {
			errors.push("Name cannot be empty");
		} else if (currentList.name.length > 100) {
			errors.push("List name cannot be longer than 100 characters");
		}

		if (errors.length > 0) {
			setListErrors(errors);
			return;
		}

		updateListByIdAxios(listId, currentList, navigate);
		setTriggerSidebarRefresh(true);
		setTriggerSidebarListRefresh(true);
		setEditToggle(false);
	};

	return (
		<div className="bg-gray-50 overflow-y-scroll min-h-full overflow-x-scroll m-4  flex flex-col">
			<div className="flex items-center justify-between gap-2 w-full p-4 ">
				{currentList &&
					(editToggle ? (
						<form
							className=" flex-grow flex flex-col gap-2"
							onSubmit={handleEditChanges}
						>
							{listErrors &&
								listErrors.map((error, idx) => (
									<p key={idx} className="text-red-500 p-2">
										{error}
									</p>
								))}
							<input
								className="text-2xl  lg:text-6xl w-full"
								type="text"
								name="name"
								value={currentList?.name}
								onChange={handleChange}
							/>
						</form>
					) : (
						<h1
							className="font-bold text-4xl lg:text-6xl"
							onDoubleClick={() => setEditToggle(true)}
						>
							{currentList.name}
						</h1>
					))}
				<div className="flex flex-col justify-center items-center max-w-[25%] text-center gap-2">
					<Link
						to={`/dashboard/${projectId}/${folderId}/${listId}/create-task`}
						className="w-full p-2 border border-1 border-gray-400 flex items-center justify-between gap-2 hover:bg-gray-800 hover:text-gray-50"
					>
						<BsPlusCircle className="h-5 w-5  " />

						<button className="">Create A Task</button>
					</Link>

					{editToggle ? (
						<button
							type="submit"
							className="w-full p-2 border border-1 border-gray-400 flex items-center justify-between gap-2 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800"
							onClick={handleEditChanges}
						>
							<FaRegCheckCircle className="h-5 w-5  " />
							Submit Changes
						</button>
					) : (
						<button
							className="w-full p-2 border border-1 border-gray-400 flex items-center justify-between gap-2 hover:bg-gray-800 hover:text-gray-50"
							onClick={() => setEditToggle(true)}
						>
							<FaEdit className="h-5 w-5  " />
							Edit List
						</button>
					)}
				</div>
			</div>
			{tasks.length > 0 ? (
				<div className=" p-4 w-full flex justify-start items-center flex-col   ">
					{tasks?.map((task, idx) => {
						return (
							<Task
								key={idx}
								task={task}
								projectId={projectId}
								folderId={folderId}
								listId={listId}
							/>
						);
					})}
				</div>
			) : (
				<div className=" text-center">No tasks in this list</div>
			)}
		</div>
	);
};

export default ListDisplay;
