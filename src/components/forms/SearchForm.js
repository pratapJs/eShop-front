import React from "react";

const SearchForm = ({ query, setQuery }) => {
	const handleSearch = (e) => {
		e.preventDefault();
		setQuery(e.target.value.toLowerCase());
	};
	return (
		<div className="container pt-4 pb-4">
			<input
				type="search"
				placeholder="Filter"
				value={query}
				onChange={handleSearch}
				className="form-control mb-4"
			/>
		</div>
	);
};

export default SearchForm;
