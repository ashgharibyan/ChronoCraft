import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/v1/accounts/users/", {
				withCredentials: true,
			})
			.then((res) => {
				console.log(res);
				setUsers(res.data.results);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div>
			<h1>Users</h1>
			<ul>
				{users.map((user, idx) => {
					return (
						<li key={idx}>
							<h2>User number {idx}</h2>
							<p>Username: {user.username}</p>
							<p>Email: {user.email}</p>
							<p>Name: {user.name}</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Users;
