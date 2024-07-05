import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);

    return (
      <div>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search country"
        />
      </div>
    );
  };
};

export default Search;
