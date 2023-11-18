import axios from "axios";
import { getCookie } from "./GeneralAxios";

export const listProjectsAxios = async (setProjects, navigate) => {
	const csrfToken = getCookie("csrftoken");

	try {
		const response = await axios.get(
			"http://localhost:8000/api/v1/projects/",
			{
				withCredentials: true,
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		console.log("Successfully fetched projects data");
		console.log(response.data.results);
		setProjects(response.data.results);
	} catch (err) {
		if (err.response && err.response.status === 401) {
			try {
				const refreshResponse = await axios.post(
					"http://localhost:8000/api/v1/accounts/dj-rest-auth/token/refresh/",
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

export const listFolderByProjectAxios = async (
	setFolders,
	project_id,
	navigate
) => {
	const csrfToken = getCookie("csrftoken");

	try {
		const response = await axios.get(
			`http://localhost:8000/api/v1/folders/?project_id=${project_id}`,
			{
				withCredentials: true,
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		console.log("Successfully fetched folders data");
		console.log(response.data.results);
		setFolders(response.data.results);
	} catch (err) {
		if (err.response && err.response.status === 401) {
			try {
				const refreshResponse = await axios.post(
					"http://localhost:8000/api/v1/accounts/dj-rest-auth/token/refresh/",
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
				listFolderByProjectAxios(setFolders, project_id, navigate); // retry fetching user data with the new token
			} catch (refreshErr) {
				console.error("Error refreshing token", refreshErr);
				navigate("/login");
			}
		} else {
			console.error("Error fetching folders list data", err);
		}
	}
};

export const listListByFolderAxios = async (setLists, folder_id, navigate) => {
	const csrfToken = getCookie("csrftoken");

	try {
		const response = await axios.get(
			`http://localhost:8000/api/v1/lists/?folder_id=${folder_id}`,
			{
				withCredentials: true,
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		console.log("Successfully fetched lists data");
		console.log(response.data.results);
		setLists(response.data.results);
	} catch (err) {
		if (err.response && err.response.status === 401) {
			try {
				const refreshResponse = await axios.post(
					"http://localhost:8000/api/v1/accounts/dj-rest-auth/token/refresh/",
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
				listListByFolderAxios(setLists, folder_id, navigate); // retry fetching user data with the new token
			} catch (refreshErr) {
				console.error("Error refreshing token", refreshErr);
				navigate("/login");
			}
		} else {
			console.error("Error fetching lists list data", err);
		}
	}
};

export const listTasksByListAxios = async (setTasks, listId, navigate) => {
	const csrfToken = getCookie("csrftoken");

	try {
		const response = await axios.get(
			`http://localhost:8000/api/v1/tasks/?list_id=${listId}`,
			{
				withCredentials: true,
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		console.log("Successfully fetched tasks data");
		console.log(response.data.results);
		setTasks(response.data.results);
	} catch (err) {
		if (err.response && err.response.status === 401) {
			try {
				const refreshResponse = await axios.post(
					"http://localhost:8000/api/v1/accounts/dj-rest-auth/token/refresh/",
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
				listTasksByListAxios(setTasks, listId, navigate); // retry fetching user data with the new token
			} catch (refreshErr) {
				console.error("Error refreshing token", refreshErr);
				navigate("/login");
			}
		} else {
			console.error("Error fetching tasks list data", err);
		}
	}
};

export const updateTaskByIdAxios = async (task_id, updatedData, navigate) => {
	const csrfToken = getCookie("csrftoken");
	// console.log("updating task", task_id, updatedData);
	try {
		const response = await axios.put(
			`http://localhost:8000/api/v1/tasks/${task_id}/`,
			updatedData,
			{
				withCredentials: true,
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		console.log(`Successfully updated task number ${task_id}`);
		console.log(response.data);
	} catch (err) {
		if (err.response && err.response.status === 401) {
			try {
				const refreshResponse = await axios.post(
					"http://localhost:8000/api/v1/accounts/dj-rest-auth/token/refresh/",
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

export const getTaskByIdAxios = async (task_id, setTask, navigate) => {
	const csrfToken = getCookie("csrftoken");
	try {
		const response = await axios.get(
			`http://localhost:8000/api/v1/tasks/${task_id}/`,
			{
				withCredentials: true,
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		console.log(`Successfully got info of task number ${task_id}`);
		console.log(response.data);
		setTask(response.data);
	} catch (err) {
		if (err.response && err.response.status === 401) {
			try {
				const refreshResponse = await axios.post(
					"http://localhost:8000/api/v1/accounts/dj-rest-auth/token/refresh/",
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
				getTaskByIdAxios(task_id, updatedData, navigate); // retry fetching user data with the new token
			} catch (refreshErr) {
				console.error("Error refreshing token", refreshErr);
				navigate("/login");
			}
		} else {
			console.error(`Error getting info of task #${task_id}`, err);
		}
	}
};
