import axios from "axios";
import { formatDate, formatDateToCustom, getCookie } from "./GeneralAxios";
import { useGeneral } from "../contexts/GeneralContext";

export const listProjectsAxios = async (setProjects, navigate) => {
	const csrfToken = getCookie("csrftoken");

	try {
		const response = await axios.get(
			"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/projects/",
			{
				withCredentials: true,
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		// console.log("Successfully fetched projects data");
		// console.log(response.data);
		setProjects(response.data);
	} catch (err) {
		if (err.response && err.response.status === 401) {
			try {
				const refreshResponse = await axios.post(
					"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/accounts/dj-rest-auth/token/refresh/",
					{},
					{
						withCredentials: true,
						headers: {
							"X-CSRFToken": csrfToken,
						},
					}
				);
				const newAccessToken = refreshResponse.data.access;
				localStorage.setItem("jwtToken", newAccessToken);
				axios.defaults.headers.common["Authorization"] =
					"Bearer " + newAccessToken;
				listProjectsAxios(setProjects, navigate); // retry fetching user data with the new token
			} catch (refreshErr) {
				console.error("Error refreshing token", refreshErr);
				navigate("/login");
			}
		} else {
			console.error("Error fetching projects list data", err);
		}
	}
};
export const listProjectsPromiseAxios = async (navigate) => {
	const csrfToken = getCookie("csrftoken");

	try {
		const response = await axios.get(
			"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/projects/",
			{
				withCredentials: true,
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		console.log("Successfully fetched projects data");
		// console.log("====== in axios:", response.data);
		return response.data;
	} catch (err) {
		if (err.response && err.response.status === 401) {
			try {
				const refreshResponse = await axios.post(
					"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/accounts/dj-rest-auth/token/refresh/",
					{},
					{
						withCredentials: true,
						headers: {
							"X-CSRFToken": csrfToken,
						},
					}
				);
				const newAccessToken = refreshResponse.data.access;
				localStorage.setItem("jwtToken", newAccessToken);
				axios.defaults.headers.common["Authorization"] =
					"Bearer " + newAccessToken;
				return listProjectsPromiseAxios(navigate); // retry fetching user data with the new token
			} catch (refreshErr) {
				console.error("Error refreshing token", refreshErr);
				navigate("/login");
			}
		} else {
			console.error("Error fetching projects list data", err);
		}
	}
};

export const getProjectByIdAxios = async (projectId, navigate) => {
	const csrfToken = getCookie("csrftoken");

	try {
		const response = await axios.get(
			`https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/projects/${projectId}`,
			{
				withCredentials: true,
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		console.log("Successfully fetched projects data");
		return response.data;
	} catch (err) {
		if (err.response && err.response.status === 401) {
			try {
				const refreshResponse = await axios.post(
					"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/accounts/dj-rest-auth/token/refresh/",
					{},
					{
						withCredentials: true,
						headers: {
							"X-CSRFToken": csrfToken,
						},
					}
				);
				const newAccessToken = refreshResponse.data.access;
				localStorage.setItem("jwtToken", newAccessToken);
				axios.defaults.headers.common["Authorization"] =
					"Bearer " + newAccessToken;
				return getProjectByIdAxios(projectId, navigate); // retry fetching user data with the new token
			} catch (refreshErr) {
				console.error("Error refreshing token", refreshErr);
				navigate("/login");
			}
		} else {
			console.error("Error fetching project data", err);
		}
	}
};

export const updateProjectByIdAxios = async (
	projectId,
	updatedProject,
	navigate
) => {
	const csrfToken = getCookie("csrftoken");

	try {
		const response = await axios.put(
			`https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/projects/${projectId}/`,
			updatedProject,
			{
				withCredentials: true,
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		console.log("Successfully updated project data");
	} catch (err) {
		if (err.response && err.response.status === 401) {
			try {
				const refreshResponse = await axios.post(
					"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/accounts/dj-rest-auth/token/refresh/",
					{},
					{
						withCredentials: true,
						headers: {
							"X-CSRFToken": csrfToken,
						},
					}
				);
				const newAccessToken = refreshResponse.data.access;
				localStorage.setItem("jwtToken", newAccessToken);
				axios.defaults.headers.common["Authorization"] =
					"Bearer " + newAccessToken;
				return updateProjectByIdAxios(
					projectId,
					updatedProject,
					navigate
				); // retry fetching user data with the new token
			} catch (refreshErr) {
				console.error("Error refreshing token", refreshErr);
				navigate("/login");
			}
		} else {
			console.error("Error updating project data", err);
		}
	}
};

export const createProjectAxios = async (newProject, navigate) => {
	const csrfToken = getCookie("csrftoken");

	try {
		const response = await axios.post(
			"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/projects/",
			newProject,
			{
				withCredentials: true,
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		console.log("Successfully created project", newProject);
	} catch (err) {
		if (err.response && err.response.status === 401) {
			try {
				const refreshResponse = await axios.post(
					"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/accounts/dj-rest-auth/token/refresh/",
					{},
					{
						withCredentials: true,
						headers: {
							"X-CSRFToken": csrfToken,
						},
					}
				);
				const newAccessToken = refreshResponse.data.access;
				localStorage.setItem("jwtToken", newAccessToken);
				axios.defaults.headers.common["Authorization"] =
					"Bearer " + newAccessToken;
				return createProjectAxios(newProject, navigate); // retry fetching user data with the new token
			} catch (refreshErr) {
				console.error("Error refreshing token", refreshErr);
				navigate("/login");
			}
		} else {
			console.error("Error creating a project", err);
		}
	}
};

export const listFolderByProjectAxios = async (project_id, navigate) => {
	const csrfToken = getCookie("csrftoken");

	try {
		const response = await axios.get(
			`https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/folders/?project_id=${project_id}`,
			{
				withCredentials: true,
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		console.log("Successfully fetched folders data");
		// console.log(response.data.results);
		return response.data;
	} catch (err) {
		if (err.response && err.response.status === 401) {
			try {
				const refreshResponse = await axios.post(
					"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/accounts/dj-rest-auth/token/refresh/",
					{},
					{
						withCredentials: true,
						headers: {
							"X-CSRFToken": csrfToken,
						},
					}
				);
				const newAccessToken = refreshResponse.data.access;
				localStorage.setItem("jwtToken", newAccessToken);
				axios.defaults.headers.common["Authorization"] =
					"Bearer " + newAccessToken;
				return listFolderByProjectAxios(project_id, navigate); // retry fetching user data with the new token
			} catch (refreshErr) {
				console.error("Error refreshing token", refreshErr);
				navigate("/login");
			}
		} else {
			console.error("Error fetching folders list data", err);
		}
	}
};

export const getFolderByIdAxios = async (folderId, navigate) => {
	const csrfToken = getCookie("csrftoken");

	try {
		const response = await axios.get(
			`https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/folders/${folderId}`,
			{
				withCredentials: true,
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		console.log("Successfully fetched folder data");
		return response.data;
	} catch (err) {
		if (err.response && err.response.status === 401) {
			try {
				const refreshResponse = await axios.post(
					"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/accounts/dj-rest-auth/token/refresh/",
					{},
					{
						withCredentials: true,
						headers: {
							"X-CSRFToken": csrfToken,
						},
					}
				);
				const newAccessToken = refreshResponse.data.access;
				localStorage.setItem("jwtToken", newAccessToken);
				axios.defaults.headers.common["Authorization"] =
					"Bearer " + newAccessToken;
				return getFolderByIdAxios(folderId, navigate); // retry fetching user data with the new token
			} catch (refreshErr) {
				console.error("Error refreshing token", refreshErr);
				navigate("/login");
			}
		} else {
			console.error("Error fetching folder data in ModelAxios.jsx ", err);
		}
	}
};

export const updateFolderByIdAxios = async (
	folderId,
	updatedFolder,
	navigate
) => {
	const csrfToken = getCookie("csrftoken");

	try {
		const response = await axios.put(
			`https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/folders/${folderId}/`,
			updatedFolder,
			{
				withCredentials: true,
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		console.log("Successfully updated folder data");
	} catch (err) {
		if (err.response && err.response.status === 401) {
			try {
				const refreshResponse = await axios.post(
					"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/accounts/dj-rest-auth/token/refresh/",
					{},
					{
						withCredentials: true,
						headers: {
							"X-CSRFToken": csrfToken,
						},
					}
				);
				const newAccessToken = refreshResponse.data.access;
				localStorage.setItem("jwtToken", newAccessToken);
				axios.defaults.headers.common["Authorization"] =
					"Bearer " + newAccessToken;
				return updateFolderByIdAxios(folderId, updatedFolder, navigate); // retry fetching user data with the new token
			} catch (refreshErr) {
				console.error("Error refreshing token", refreshErr);
				navigate("/login");
			}
		} else {
			console.error("Error updating folder data", err);
		}
	}
};

export const createFolderAxios = async (newFolder, navigate) => {
	const csrfToken = getCookie("csrftoken");

	try {
		const response = await axios.post(
			"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/folders/",
			newFolder,
			{
				withCredentials: true,
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		console.log("Successfully created folder", newFolder);
	} catch (err) {
		if (err.response && err.response.status === 401) {
			try {
				const refreshResponse = await axios.post(
					"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/accounts/dj-rest-auth/token/refresh/",
					{},
					{
						withCredentials: true,
						headers: {
							"X-CSRFToken": csrfToken,
						},
					}
				);
				const newAccessToken = refreshResponse.data.access;
				localStorage.setItem("jwtToken", newAccessToken);
				axios.defaults.headers.common["Authorization"] =
					"Bearer " + newAccessToken;
				return createFolderAxios(newFolder, navigate); // retry fetching user data with the new token
			} catch (refreshErr) {
				console.error("Error refreshing token", refreshErr);
				navigate("/login");
			}
		} else {
			console.error("Error creating a folder", err);
		}
	}
};

export const listListsByFolderAxios = async (folder_id, navigate) => {
	const csrfToken = getCookie("csrftoken");

	try {
		const response = await axios.get(
			`https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/lists/?folder_id=${folder_id}`,
			{
				withCredentials: true,
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		console.log("Successfully fetched lists data");
		// console.log(response.data.results);
		return response.data;
	} catch (err) {
		if (err.response && err.response.status === 401) {
			try {
				const refreshResponse = await axios.post(
					"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/accounts/dj-rest-auth/token/refresh/",
					{},
					{
						withCredentials: true,
						headers: {
							"X-CSRFToken": csrfToken,
						},
					}
				);
				const newAccessToken = refreshResponse.data.access;
				localStorage.setItem("jwtToken", newAccessToken);
				axios.defaults.headers.common["Authorization"] =
					"Bearer " + newAccessToken;
				return listListsByFolderAxios(folder_id, navigate); // retry fetching user data with the new token
			} catch (refreshErr) {
				console.error("Error refreshing token", refreshErr);
				navigate("/login");
			}
		} else {
			console.error("Error fetching lists list data", err);
		}
	}
};

export const createListAxios = async (newList, navigate) => {
	const csrfToken = getCookie("csrftoken");

	try {
		const response = await axios.post(
			"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/lists/",
			newList,
			{
				withCredentials: true,
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		console.log("Successfully created list", newList);
	} catch (err) {
		if (err.response && err.response.status === 401) {
			try {
				const refreshResponse = await axios.post(
					"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/accounts/dj-rest-auth/token/refresh/",
					{},
					{
						withCredentials: true,
						headers: {
							"X-CSRFToken": csrfToken,
						},
					}
				);
				const newAccessToken = refreshResponse.data.access;
				localStorage.setItem("jwtToken", newAccessToken);
				axios.defaults.headers.common["Authorization"] =
					"Bearer " + newAccessToken;
				return createListAxios(newList, navigate); // retry fetching user data with the new token
			} catch (refreshErr) {
				console.error("Error refreshing token", refreshErr);
				navigate("/login");
			}
		} else {
			console.error("Error creating a list", err);
		}
	}
};

export const getListByIdAxios = async (list_id, navigate) => {
	const csrfToken = getCookie("csrftoken");
	try {
		const response = await axios.get(
			`https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/lists/${list_id}/`,
			{
				withCredentials: true,
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		console.log(`Successfully got info of list number ${list_id}`);
		return response.data;
	} catch (err) {
		if (err.response && err.response.status === 401) {
			try {
				const refreshResponse = await axios.post(
					"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/accounts/dj-rest-auth/token/refresh/",
					{},
					{
						withCredentials: true,
						headers: {
							"X-CSRFToken": csrfToken,
						},
					}
				);
				const newAccessToken = refreshResponse.data.access;
				localStorage.setItem("jwtToken", newAccessToken);
				axios.defaults.headers.common["Authorization"] =
					"Bearer " + newAccessToken;
				return getListByIdAxios(list_id, navigate); // retry fetching user data with the new token
			} catch (refreshErr) {
				console.error("Error refreshing token", refreshErr);
				navigate("/login");
			}
		} else {
			console.error(`Error getting info of list #${task_id}`, err);
		}
	}
};

export const updateListByIdAxios = async (list_id, newList, navigate) => {
	const csrfToken = getCookie("csrftoken");
	try {
		const response = await axios.put(
			`https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/lists/${list_id}/`,
			newList,
			{
				withCredentials: true,
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		console.log(`Successfully updated list number ${list_id}`);
	} catch (err) {
		if (err.response && err.response.status === 401) {
			try {
				const refreshResponse = await axios.post(
					"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/accounts/dj-rest-auth/token/refresh/",
					{},
					{
						withCredentials: true,
						headers: {
							"X-CSRFToken": csrfToken,
						},
					}
				);
				const newAccessToken = refreshResponse.data.access;
				localStorage.setItem("jwtToken", newAccessToken);
				axios.defaults.headers.common["Authorization"] =
					"Bearer " + newAccessToken;
				return getListByIdAxios(list_id, newList, navigate); // retry fetching user data with the new token
			} catch (refreshErr) {
				console.error("Error refreshing token", refreshErr);
				navigate("/login");
			}
		} else {
			console.error(`Error updating list #${task_id}`, err);
		}
	}
};

export const listTasksByListAxios = async (listId, navigate) => {
	const csrfToken = getCookie("csrftoken");

	try {
		const response = await axios.get(
			`https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/tasks/?list_id=${listId}`,
			{
				withCredentials: true,
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		console.log("Successfully fetched tasks data in Get Tasks By List");
		// console.log(response.data);
		// setTasks(response.data.results);
		return response.data;
	} catch (err) {
		if (err.response && err.response.status === 401) {
			try {
				const refreshResponse = await axios.post(
					"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/accounts/dj-rest-auth/token/refresh/",
					{},
					{
						withCredentials: true,
						headers: {
							"X-CSRFToken": csrfToken,
						},
					}
				);
				const newAccessToken = refreshResponse.data.access;
				localStorage.setItem("jwtToken", newAccessToken);
				axios.defaults.headers.common["Authorization"] =
					"Bearer " + newAccessToken;
				return listTasksByListAxios(listId, navigate); // retry fetching user data with the new token
			} catch (refreshErr) {
				console.error("Error refreshing token", refreshErr);
				navigate("/login");
			}
		} else {
			console.error("Error fetching tasks list data", err);
		}
	}
};

export const createTaskAxios = async (newTask, navigate) => {
	const csrfToken = getCookie("csrftoken");

	try {
		const response = await axios.post(
			"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/tasks/",
			newTask,
			{
				withCredentials: true,
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		console.log("Successfully created task", newTask);
	} catch (err) {
		if (err.response && err.response.status === 401) {
			try {
				const refreshResponse = await axios.post(
					"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/accounts/dj-rest-auth/token/refresh/",
					{},
					{
						withCredentials: true,
						headers: {
							"X-CSRFToken": csrfToken,
						},
					}
				);
				const newAccessToken = refreshResponse.data.access;
				localStorage.setItem("jwtToken", newAccessToken);
				axios.defaults.headers.common["Authorization"] =
					"Bearer " + newAccessToken;
				return createTaskAxios(newTask, navigate); // retry fetching user data with the new token
			} catch (refreshErr) {
				console.error("Error refreshing token", refreshErr);
				navigate("/login");
			}
		} else {
			console.error("Error creating a task", err);
		}
	}
};

export const updateTaskByIdAxios = async (
	task_id,
	updatedData,
	navigate,
	setTriggerTasksRefreshInListDisplay = null,
	triggerTasksRefreshInListDisplay = null
) => {
	const csrfToken = getCookie("csrftoken");
	// console.log("updating task", task_id, updatedData);
	try {
		const response = await axios.put(
			`https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/tasks/${task_id}/`,
			updatedData,
			{
				withCredentials: true,
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		console.log(`Successfully updated task number ${task_id}`);
		if (triggerTasksRefreshInListDisplay != null) {
			setTriggerTasksRefreshInListDisplay(
				!triggerTasksRefreshInListDisplay
			);
		}
		// console.log(response.data);
	} catch (err) {
		if (err.response && err.response.status === 401) {
			try {
				const refreshResponse = await axios.post(
					"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/accounts/dj-rest-auth/token/refresh/",
					{},
					{
						withCredentials: true,
						headers: {
							"X-CSRFToken": csrfToken,
						},
					}
				);
				const newAccessToken = refreshResponse.data.access;
				localStorage.setItem("jwtToken", newAccessToken);
				axios.defaults.headers.common["Authorization"] =
					"Bearer " + newAccessToken;
				updateTaskByIdAxios(task_id, updatedData, navigate); // retry fetching user data with the new token
			} catch (refreshErr) {
				console.error("Error refreshing token", refreshErr);
				navigate("/login");
			}
		} else {
			console.error(`Error updating task #${task_id}`, err);
		}
	}
};

export const getTaskByIdAxios = async (task_id, navigate) => {
	const csrfToken = getCookie("csrftoken");
	try {
		const response = await axios.get(
			`https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/tasks/${task_id}/`,
			{
				withCredentials: true,
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		console.log(`Successfully got info of task number ${task_id}`);
		// console.log(response.data);
		let updatedData = response.data;

		const formattedCreatedAt = formatDateToCustom(updatedData.created_at);

		const formattedUpdatedAt = formatDateToCustom(updatedData.updated_at);

		if (updatedData.due_date == null) {
			updatedData = {
				...updatedData,
				due_date: null,
				created_at: formattedCreatedAt,
				updated_at: formattedUpdatedAt,
			};
		} else {
			const formattedDueDate = formatDate(updatedData.due_date);

			updatedData = {
				...updatedData,
				due_date: formattedDueDate,
				created_at: formattedCreatedAt,
				updated_at: formattedUpdatedAt,
			};
		}
		return updatedData;
	} catch (err) {
		if (err.response && err.response.status === 401) {
			try {
				const refreshResponse = await axios.post(
					"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/accounts/dj-rest-auth/token/refresh/",
					{},
					{
						withCredentials: true,
						headers: {
							"X-CSRFToken": csrfToken,
						},
					}
				);
				const newAccessToken = refreshResponse.data.access;
				localStorage.setItem("jwtToken", newAccessToken);
				axios.defaults.headers.common["Authorization"] =
					"Bearer " + newAccessToken;
				return getTaskByIdAxios(task_id, navigate); // retry fetching user data with the new token
			} catch (refreshErr) {
				console.error("Error refreshing token", refreshErr);
				navigate("/login");
			}
		} else {
			console.error(`Error getting info of task #${task_id}`, err);
		}
	}
};

export const fetchUserData = async (setUser, navigate) => {
	const csrfToken = getCookie("csrftoken");

	try {
		const response = await axios.get(
			"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/accounts/dj-rest-auth/user/",
			{
				withCredentials: true,
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		console.log("Successfully fetched user data");
		// console.log(response.data);
		setUser(response.data);
	} catch (err) {
		if (err.response.status === 401) {
			try {
				const csrfToken = getCookie("csrftoken");
				console.log("Refreshing token");
				const refreshResponse = await axios.post(
					"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/accounts/dj-rest-auth/token/refresh/",
					{},
					{
						withCredentials: true,
						headers: {
							"X-CSRFToken": csrfToken,
						},
					}
				);
				const newAccessToken = refreshResponse.data.access;
				localStorage.setItem("jwtToken", newAccessToken);
				axios.defaults.headers.common["Authorization"] =
					"Bearer " + newAccessToken;
				return fetchUserData(setUser, navigate); // retry fetching user data with the new token
			} catch (refreshErr) {
				console.log("Error refreshing token", refreshErr);
				navigate("/login");
			}
		} else {
			console.log("Error fetching user data", err);
		}
	}
};

// DELETES

export const deleteTaskByIdAxios = async (task_id, navigate) => {
	const csrfToken = getCookie("csrftoken");
	try {
		const response = await axios.delete(
			`https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/tasks/${task_id}/`,
			{
				withCredentials: true,
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		console.log(`Successfully deleted task number ${task_id}`);
	} catch (err) {
		if (err.response && err.response.status === 401) {
			try {
				const refreshResponse = await axios.post(
					"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/accounts/dj-rest-auth/token/refresh/",
					{},
					{
						withCredentials: true,
						headers: {
							"X-CSRFToken": csrfToken,
						},
					}
				);
				const newAccessToken = refreshResponse.data.access;
				localStorage.setItem("jwtToken", newAccessToken);
				axios.defaults.headers.common["Authorization"] =
					"Bearer " + newAccessToken;
				return deleteTaskByIdAxios(task_id, navigate); // retry fetching user data with the new token
			} catch (refreshErr) {
				console.error("Error refreshing token", refreshErr);
				navigate("/login");
			}
		} else {
			console.error(`Error deleteing task #${task_id}`, err);
		}
	}
};

export const deleteProjectByIdAxios = async (project_id, navigate) => {
	const csrfToken = getCookie("csrftoken");
	try {
		const response = await axios.delete(
			`https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/projects/${project_id}/`,
			{
				withCredentials: true,
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		console.log(`Successfully deleted project number ${project_id}`);
	} catch (err) {
		if (err.response && err.response.status === 401) {
			try {
				const refreshResponse = await axios.post(
					"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/accounts/dj-rest-auth/token/refresh/",
					{},
					{
						withCredentials: true,
						headers: {
							"X-CSRFToken": csrfToken,
						},
					}
				);
				const newAccessToken = refreshResponse.data.access;
				localStorage.setItem("jwtToken", newAccessToken);
				axios.defaults.headers.common["Authorization"] =
					"Bearer " + newAccessToken;
				return deleteProjectByIdAxios(project_id, navigate); // retry fetching user data with the new token
			} catch (refreshErr) {
				console.error("Error refreshing token", refreshErr);
				navigate("/login");
			}
		} else {
			console.error(`Error deleteing project #${project_id}`, err);
		}
	}
};

export const deleteFolderByIdAxios = async (folder_id, navigate) => {
	const csrfToken = getCookie("csrftoken");
	try {
		const response = await axios.delete(
			`https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/folders/${folder_id}/`,
			{
				withCredentials: true,
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		console.log(`Successfully deleted folder number ${folder_id}`);
	} catch (err) {
		if (err.response && err.response.status === 401) {
			try {
				const refreshResponse = await axios.post(
					"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/accounts/dj-rest-auth/token/refresh/",
					{},
					{
						withCredentials: true,
						headers: {
							"X-CSRFToken": csrfToken,
						},
					}
				);
				const newAccessToken = refreshResponse.data.access;
				localStorage.setItem("jwtToken", newAccessToken);
				axios.defaults.headers.common["Authorization"] =
					"Bearer " + newAccessToken;
				return deleteFolderByIdAxios(folder_id, navigate); // retry fetching user data with the new token
			} catch (refreshErr) {
				console.error("Error refreshing token", refreshErr);
				navigate("/login");
			}
		} else {
			console.error(`Error deleteing folder #${folder_id}`, err);
		}
	}
};

export const deleteListByIdAxios = async (list_id, navigate) => {
	const csrfToken = getCookie("csrftoken");
	try {
		const response = await axios.delete(
			`https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/lists/${list_id}/`,
			{
				withCredentials: true,
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		console.log(`Successfully deleted list number ${list_id}`);
	} catch (err) {
		if (err.response && err.response.status === 401) {
			try {
				const refreshResponse = await axios.post(
					"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/accounts/dj-rest-auth/token/refresh/",
					{},
					{
						withCredentials: true,
						headers: {
							"X-CSRFToken": csrfToken,
						},
					}
				);
				const newAccessToken = refreshResponse.data.access;
				localStorage.setItem("jwtToken", newAccessToken);
				axios.defaults.headers.common["Authorization"] =
					"Bearer " + newAccessToken;
				return deleteListByIdAxios(list_id, navigate); // retry fetching user data with the new token
			} catch (refreshErr) {
				console.error("Error refreshing token", refreshErr);
				navigate("/login");
			}
		} else {
			console.error(`Error deleteing list #${list_id}`, err);
		}
	}
};
// SEARCHES

export const searchProject = async (searchTerm, navigate) => {
	const csrfToken = getCookie("csrftoken");

	try {
		const response = await axios.get(
			`https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/projects/search/?project_title=${searchTerm}`,
			{
				withCredentials: true,
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		console.log(`Successfully searched ${searchTerm} in projects `);
		return response.data;
	} catch (err) {
		if (err.response && err.response.status === 401) {
			try {
				const refreshResponse = await axios.post(
					"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/accounts/dj-rest-auth/token/refresh/",
					{},
					{
						withCredentials: true,
						headers: {
							"X-CSRFToken": csrfToken,
						},
					}
				);
				const newAccessToken = refreshResponse.data.access;
				localStorage.setItem("jwtToken", newAccessToken);
				axios.defaults.headers.common["Authorization"] =
					"Bearer " + newAccessToken;
				return searchProject(searchTerm, navigate); // retry fetching user data with the new token
			} catch (refreshErr) {
				console.error("Error refreshing token", refreshErr);
				navigate("/login");
			}
		} else {
			console.error(`Error searching ${searchTerm} in projects `, err);
		}
	}
};

export const searchFolder = async (searchTerm, navigate) => {
	const csrfToken = getCookie("csrftoken");

	try {
		const response = await axios.get(
			`https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/folders/search/?folder_name=${searchTerm}`,
			{
				withCredentials: true,
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		console.log(`Successfully searched ${searchTerm} in folders `);
		return response.data;
	} catch (err) {
		if (err.response && err.response.status === 401) {
			try {
				const refreshResponse = await axios.post(
					"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/accounts/dj-rest-auth/token/refresh/",
					{},
					{
						withCredentials: true,
						headers: {
							"X-CSRFToken": csrfToken,
						},
					}
				);
				const newAccessToken = refreshResponse.data.access;
				localStorage.setItem("jwtToken", newAccessToken);
				axios.defaults.headers.common["Authorization"] =
					"Bearer " + newAccessToken;
				return searchFolder(searchTerm, navigate); // retry fetching user data with the new token
			} catch (refreshErr) {
				console.error("Error refreshing token", refreshErr);
				navigate("/login");
			}
		} else {
			console.error(`Error searching ${searchTerm} in folders `, err);
		}
	}
};

export const searchList = async (searchTerm, navigate) => {
	const csrfToken = getCookie("csrftoken");

	try {
		const response = await axios.get(
			`https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/lists/search/?list_name=${searchTerm}`,
			{
				withCredentials: true,
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		console.log(`Successfully searched ${searchTerm} in lists `);
		return response.data;
	} catch (err) {
		if (err.response && err.response.status === 401) {
			try {
				const refreshResponse = await axios.post(
					"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/accounts/dj-rest-auth/token/refresh/",
					{},
					{
						withCredentials: true,
						headers: {
							"X-CSRFToken": csrfToken,
						},
					}
				);
				const newAccessToken = refreshResponse.data.access;
				localStorage.setItem("jwtToken", newAccessToken);
				axios.defaults.headers.common["Authorization"] =
					"Bearer " + newAccessToken;
				return searchList(searchTerm, navigate); // retry fetching user data with the new token
			} catch (refreshErr) {
				console.error("Error refreshing token", refreshErr);
				navigate("/login");
			}
		} else {
			console.error(`Error searching ${searchTerm} in lists `, err);
		}
	}
};

export const searchTask = async (searchTerm, navigate) => {
	const csrfToken = getCookie("csrftoken");

	try {
		const response = await axios.get(
			`https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/tasks/search/?task_name=${searchTerm}`,
			{
				withCredentials: true,
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		console.log(`Successfully searched ${searchTerm} in tasks `);
		return response.data;
	} catch (err) {
		if (err.response && err.response.status === 401) {
			try {
				const refreshResponse = await axios.post(
					"https://chronocraft-backend-b55cb29d1834.herokuapp.com/api/v1/accounts/dj-rest-auth/token/refresh/",
					{},
					{
						withCredentials: true,
						headers: {
							"X-CSRFToken": csrfToken,
						},
					}
				);
				const newAccessToken = refreshResponse.data.access;
				localStorage.setItem("jwtToken", newAccessToken);
				axios.defaults.headers.common["Authorization"] =
					"Bearer " + newAccessToken;
				return searchTask(searchTerm, navigate); // retry fetching user data with the new token
			} catch (refreshErr) {
				console.error("Error refreshing token", refreshErr);
				navigate("/login");
			}
		} else {
			console.error(`Error searching ${searchTerm} in tasks `, err);
		}
	}
};
