import React from "react";

const ProjectCard = ({ project }) => {
	const { title, description, updated_at } = project;

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
		<div className="min-w-fit rounded overflow-hidden shadow-lg bg-white p-2">
			<div className="px-6 py-2">
				<div className="font-bold text-xl mb-2 text-black">{title}</div>
				<p className="text-gray-400 text-base">{description}</p>
			</div>
			<div className="px-6 pb-2">
				<span className="inline-block bg-gray-50 rounded-full px-3 py-1 text-sm font-semibold text-gray-400 mr-2 mb-2">
					Last Updated: {formattedLastUpdated}
				</span>
			</div>
			<div className="px-6 pb-2 flex justify-center gap-3">
				<button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
					Open
				</button>
				<button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
					Edit
				</button>
			</div>
		</div>
	);
};

export default ProjectCard;
