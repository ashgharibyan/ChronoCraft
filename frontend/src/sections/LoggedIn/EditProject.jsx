import React from "react";
import { useParams } from "react-router-dom";

const EditProject = () => {
	const { project_id } = useParams();
	return <div>Edit Project # {project_id}</div>;
};

export default EditProject;
