// components/DropdownSelector.js
import React from "react";

const DropdownSelector = ({ selectedCategory, onChangeCategory, options }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="category-selector"
        className="block text-sm font-medium text-gray-700"
      >
        Select Category
      </label>
      <select
        id="category-selector"
        value={selectedCategory}
        onChange={(e) => onChangeCategory(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownSelector;
