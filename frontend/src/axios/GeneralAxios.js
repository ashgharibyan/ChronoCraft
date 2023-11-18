// GeneralAxios.js
import axios from "axios";

// A utility function to get cookies
export function getCookie(name) {
	let value = "; " + document.cookie;
	let parts = value.split("; " + name + "=");
	if (parts.length === 2) return parts.pop().split(";").shift();
}

export function formatDate(dateTimeString) {
	const date = new Date(dateTimeString);
	const year = date.getUTCFullYear();
	const month = String(date.getUTCMonth() + 1).padStart(2, "0");
	const day = String(date.getUTCDate()).padStart(2, "0");
	const hours = String(date.getUTCHours()).padStart(2, "0");
	const minutes = String(date.getUTCMinutes()).padStart(2, "0");

	return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function convertLocalToISO(dateTimeLocal) {
	const localDate = new Date(dateTimeLocal);
	const year = localDate.getFullYear();
	const month = String(localDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
	const day = String(localDate.getDate()).padStart(2, "0");
	const hours = String(localDate.getHours()).padStart(2, "0");
	const minutes = String(localDate.getMinutes()).padStart(2, "0");

	return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function formatDateToCustom(dateTimeString) {
	const date = new Date(dateTimeString);

	// Formatting hours for AM/PM
	let hours = date.getHours();
	const ampm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'

	const minutes = String(date.getMinutes()).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
	const year = date.getFullYear();

	return `${hours}:${minutes} ${ampm} ${month}/${day}/${year}`;
}

// Function to fetch user data
export const fetchUserData = async (setUser, navigate) => {
	const csrfToken = getCookie("csrftoken");

	try {
		const response = await axios.get(
			"http://localhost:8000/api/v1/accounts/dj-rest-auth/user/",
			{
				withCredentials: true,
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		console.log("Successfully fetched user data");
		setUser(response.data);
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
				fetchUserData(setUser, navigate); // retry fetching user data with the new token
			} catch (refreshErr) {
				console.error("Error refreshing token", refreshErr);
				navigate("/login");
			}
		} else {
			console.error("Error fetching user data", err);
		}
	}
};

export const projectsAxios = async (setProjects, navigate) => {
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
		console.log("Successfully fetched all projects data");
		// console.log(response.data.results);
		setProjects(response.data.results);
	} catch (err) {
		if (err?.response?.status === 401) {
			try {
				const csrfToken = getCookie("csrftoken");

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
				projectsAxios(setProjects, navigate); // retry fetching user data with the new token
			} catch (refreshErr) {
				console.log("Error refreshing token", refreshErr);
				navigate("/login");
			}
		} else {
			console.log("Error getting projects data", err);
		}
	}
};
