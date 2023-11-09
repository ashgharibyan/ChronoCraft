import React, { useEffect } from "react";
import { AiOutlineCaretDown, AiOutlineSearch } from "react-icons/ai";
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";
import { useGeneral } from "../../contexts/GeneralContext";
import { Link } from "react-router-dom";

const TopBar = () => {
	const {
		toggleSidebar,
		setToggleSidebar,
		wasToggledManually,
		setWasToggledManually,
		toggleProfile,
		setToggleProfile,
	} = useGeneral();

	const handleSidebarOpenButton = () => {
		setToggleSidebar(!toggleSidebar);
		setWasToggledManually(true);
	};

	return (
		<div className="flex w-full min-h-[83px] gap-4 justify-between items-center p-4 bg-gradient-to-tr from-indigo-600 to-indigo-800  border-b-[1px] border-white">
			{toggleSidebar ? (
				""
			) : (
				<button
					type="button"
					onClick={handleSidebarOpenButton}
					className={`text-white `}
				>
					<BsReverseLayoutTextSidebarReverse className="h-6 w-6" />
				</button>
			)}

			<div className="flex items-center space-x-2 w-[350px]">
				<label forhtml="searchBar" className="text-white" />
				<input
					type="search"
					name="searchBar"
					id="searchBar"
					className="bg-transparent border-b-[1px] w-full rounded-xl border-white text-white placeholder-white focus:outline-none focus:border-white "
					placeholder="Search"
				/>
				<button type="submit" className="text-white">
					<AiOutlineSearch className="h-6 w-6" />
				</button>
			</div>

			<div id="userInfo" className="flex items-center space-x-2">
				<Link to="/dashboard/profile/" className="hidden md:block">
					<p className="text-white">John Doe</p>
				</Link>
				<Link
					to="/dashboard/profile/"
					className="h-10 w-10 rounded-full"
				>
					<img
						src="https://picsum.photos/200/300"
						alt="profile picture"
						className="h-10 w-10 rounded-full"
					/>
				</Link>
				<AiOutlineCaretDown className="text-white" />
			</div>
		</div>
	);
};

export default TopBar;
