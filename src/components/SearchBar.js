import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search by name, email or body..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border mb-4"
    />
  );
};

export default SearchBar;