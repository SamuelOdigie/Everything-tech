import React, { useState, useEffect } from "react";
import JobItem from "./jobHuntHelpers/jobItem";
import Pagination from "./jobHuntHelpers/pagination";

const JobHunt = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(10);
  const [totalJobs, setTotalJobs] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/jobHunt?page=${currentPage}&limit=${jobsPerPage}`
        );
        if (!response.ok) {
          throw new Error("Something went wrong while fetching jobs");
        }
        const data = await response.json();
        setJobs(data.jobs);
        setTotalJobs(data.count);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [currentPage, jobsPerPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">Job Listings</h1>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {isLoading ? (
        <div className="text-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12 mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-500">
            Loading jobs...
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobItem key={job.id} job={job} />
          ))}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        jobsPerPage={jobsPerPage}
        totalJobs={totalJobs}
        paginate={paginate}
      />
    </div>
  );
};

export default JobHunt;
