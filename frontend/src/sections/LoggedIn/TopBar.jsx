import React, { useEffect, useState } from "react";
import { AiOutlineCaretDown, AiOutlineSearch } from "react-icons/ai";
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";
import { useGeneral } from "../../contexts/GeneralContext";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserData } from "../../axios/ModelAxios";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
const TopBar = () => {
	const { toggleSidebar, setToggleSidebar, setWasToggledManually, user } =
		useGeneral();
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate();
	const handleSidebarOpenButton = () => {
		setToggleSidebar(!toggleSidebar);
		setWasToggledManually(true);
	};

	const handleSearch = () => {
		console.log(searchTerm);
		navigate(`/dashboard/search/${searchTerm}`);
		setSearchTerm("");
	};

	return (
		<div className="w-full text-white flex min-h-[83px] gap-4 justify-between items-center p-4 bg-gradient-to-tr from-indigo-600 to-indigo-800  border-b-[1px] border-white">
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

			<form
				onSubmit={handleSearch}
				className="flex items-center space-x-2 w-[350px]"
			>
				<label forhtml="searchBar" className="text-white" />
				<input
					type="search"
					name="searchBar"
					id="searchBar"
					value={searchTerm}
					className="bg-transparent border-b-[1px] w-full rounded-xl border-white text-white placeholder-white focus:outline-none focus:border-white "
					placeholder="Search"
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<button type="submit" className="text-white">
					<AiOutlineSearch className="h-6 w-6" />
				</button>
			</form>

			<div id="userInfo" className="flex items-center space-x-2">
				<Link to="/dashboard/profile/" className="hidden md:block">
					<p className="text-white">{user?.name}</p>
				</Link>
				<Link
					to="/dashboard/profile/"
					className="h-10 w-10 rounded-full"
				>
					<CgProfile className="h-10 w-10 rounded-full" />
				</Link>
				{/* <AiOutlineCaretDown className="text-white" /> */}
			</div>
		</div>
	);
};

export default TopBar;
