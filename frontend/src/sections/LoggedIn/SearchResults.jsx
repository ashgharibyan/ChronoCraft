import React, { useState } from "react";
import { useParams } from "react-router-dom";

const SearchResults = () => {
	const { searchTerm } = useParams();
	const [loaded, setLoaded] = useState(false);

	return <div>{loaded ? <div></div> : <h1>Loading...</h1>}</div>;
};

export default SearchResults;
