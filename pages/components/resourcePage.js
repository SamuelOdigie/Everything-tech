// pages/ResourcesPage.js
import React, { useState } from "react";
import DropdownSelector from "./dropdownSelector"; // Adjust path as needed
import techResources from "../api/resourceData/techResources"; // Adjust path as needed

const ResourcesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("frontend");

  const onChangeCategory = (category) => {
    setSelectedCategory(category);
  };

  const currentCategoryData = techResources[selectedCategory] || [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Learning Path</h1>
      <DropdownSelector
        selectedCategory={selectedCategory}
        onChangeCategory={onChangeCategory}
        options={[
          { value: "frontend", label: "Frontend Development" },
          { value: "backend", label: "Backend Development" },
        ]}
      />
      <div className="mt-6 flex flex-col items-center">
        {currentCategoryData.map((resource, index) => (
          <React.Fragment key={resource.id}>
            <div className="w-3/4 p-4 border rounded shadow-lg text-center">
              <h3 className="font-bold text-lg">{resource.title}</h3>
              <p>{resource.description}</p>
              <div className="mt-2">
                {resource.resources.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline block"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
            {index < currentCategoryData.length - 1 && (
              <div className="flex items-center justify-center my-4">
                <span className="inline-block h-1 w-8 bg-blue-500"></span>
                <svg
                  className="fill-current text-blue-500"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 21L12 3m0 18L5 11m7 10l7-10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="inline-block h-1 w-8 bg-blue-500"></span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ResourcesPage;
