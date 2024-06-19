import React, { useState, useEffect } from "react";
import JobItem from "./jobHuntHelpers/jobItem";
import Pagination from "./jobHuntHelpers/pagination";

const JobHunt = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(10);
  const [totalJobs, setTotalJobs] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Correct the API endpoint according to your Next.js API route structure
        const response = await fetch(
          `/api/jobHunt?page=${currentPage}&limit=${jobsPerPage}`
        );
        if (!response.ok) {
          throw new Error("Something went wrong while fetching jobs");
        }
        const data = await response.json();
        setJobs(data.jobs);
        setTotalJobs(data.count); // Assuming API returns a total count of jobs
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [currentPage, jobsPerPage]);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      {error && <p className="text-red-500">Error: {error}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <JobItem key={job.id} job={job} />
          ))}
          <Pagination
            currentPage={currentPage}
            jobsPerPage={jobsPerPage}
            totalJobs={totalJobs}
            paginate={paginate}
          />
        </div>
      )}
    </div>
  );
};
export default JobHunt;
