import React, { createContext, useState, useContext } from "react";

// Create Context object.
export const ModelContext = createContext();

// Create a provider component.
export const ModelProvider = ({ children }) => {
	const [projects, setProjects] = useState([]);
	const [selectedProject, setSelectedProject] = useState("");
	const [folders, setFolders] = useState([]);
	const [selectedFolder, setSelectedFolder] = useState("");
	const [lists, setLists] = useState([]);
	const [selectedList, setSelectedList] = useState("");
	const [tasks, setTasks] = useState([]);
	const [selectedTask, setSelectedTask] = useState("");

	return (
		<ModelContext.Provider
			value={{
				projects,
				setProjects,
				selectedProject,
				setSelectedProject,
				folders,
				setFolders,
				selectedFolder,
				setSelectedFolder,
				lists,
				setLists,
				selectedList,
				setSelectedList,
				tasks,
				setTasks,
				selectedTask,
				setSelectedTask,
			}}
		>
			{children}
		</ModelContext.Provider>
	);
};

// Custom hook to use the ModelContext
export const useModel = () => {
	const context = useContext(ModelContext);
	if (!context) {
		throw new Error("useModel must be used within a ModelProvider");
	}
	return context;
};
