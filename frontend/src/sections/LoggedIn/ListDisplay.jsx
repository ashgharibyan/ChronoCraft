import React, { useEffect } from "react";
import { useModel } from "../../contexts/ModelContext";
import { listTasksByListAxios } from "../../axios/ModelAxios";
import { useNavigate, useParams } from "react-router-dom";

const ListDisplay = () => {
	const navigate = useNavigate();
	const { selectedProject, selectedFolder, selectedList, setTasks, tasks } =
		useModel();

	const { projectId, folderId, listId } = useParams();

	useEffect(() => {
		listTasksByListAxios(setTasks, listId, navigate, projectId, folderId);
	}, [listId, projectId, folderId]);

	return (
		<div
			className={`overflow-y-scroll min-h-full overflow-x-scroll bg-slate-300 m-4 `}
		>
			{tasks &&
				tasks.map((task, idx) => {
					return <div key={idx}>{task.name}</div>;
				})}
		</div>
	);
};

export default ListDisplay;
