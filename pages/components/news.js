import React, { useState, useEffect } from "react";
import NewsItem from "./newsHelpers/newsItems"; // Ensure path is correct
import Pagination from "./newsHelpers/pagination.js"; // Ensure path is correct

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(10); // Adjust per page limit as needed
  const [totalNews, setTotalNews] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/getNews?page=${currentPage}&limit=${newsPerPage}`
        );
        if (!response.ok) throw new Error("Failed to fetch news");
        const data = await response.json();
        setNews(data.news || []); // Added fallback to an empty array
        setTotalNews(data.news ? data.news.length : 0); // Set to 0 if data.data is undefined
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [currentPage, newsPerPage]);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Latest News</h1>
      {error && <p className="text-red-500">{error}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {news.map((newss) => (
            <NewsItem key={newss._id} news={newss} />
          ))}
          <Pagination
            currentPage={currentPage}
            newsPerPage={newsPerPage}
            totalNews={totalNews}
            paginate={paginate}
          />
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
