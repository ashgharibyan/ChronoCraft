import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
	const { title, description, updated_at, id } = project;

	// Format the last updated time for display
	const formattedLastUpdated = new Date(updated_at).toLocaleDateString(
		"en-US",
		{
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		}
	);

	return (
		<div className="min-w-full rounded overflow-hidden shadow-lg bg-white p-2 hover:bg-gray-100">
			<div className="px-6 py-2">
				<div className="font-bold text-xl mb-3 text-gray-700">
					{title}
				</div>
				<p className="text-gray-400 text-base mb-1">{description}</p>
				<p className=" text-gray-400 text-base mb-2">
					Last Updated: {formattedLastUpdated}
				</p>
			</div>
			<div className="px-6 pb-2 flex justify-center gap-3">
				<Link to={`/dashboard/project/${id}`}>
					<button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
						Open
					</button>{" "}
				</Link>
				<Link to={`/dashboard/project/${id}/edit`}>
					<button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
						Edit
					</button>
				</Link>
			</div>
		</div>
	);
};

export default ProjectCard;
