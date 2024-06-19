import fetch from "node-fetch";
import { connectToDatabase } from "@/pages/lib/db";

// Fetch news data from API
async function fetchNewsData() {
  const url =
    "https://real-time-news-data.p.rapidapi.com/search?query=software%20engineers&limit=15&time_published=7d&country=GB&lang=en";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": process.env.RAPIDAPI_HOST_NEWS,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP status ${response.status}`);
    const data = await response.json();
    return data; // Adjust according to the actual data structure, if needed
  } catch (error) {
    console.error("Failed to fetch news data:", error);
    throw error;
  }
}

// Store news data in MongoDB
async function storeNewsData(db, newsItems) {
  const collection = db.collection("news");
  // Upsert news items based on the title as a unique identifier
  for (const newsItem of newsItems) {
    await collection.updateOne(
      { title: newsItem.title }, // Using title as a unique identifier
      {
        $set: {
          link: newsItem.link,
          photo_url: newsItem.photo_url,
          published_datetime_utc: newsItem.published_datetime_utc,
          source_url: newsItem.source_url,
        },
      },
      { upsert: true }
    );
  }
}

// Function to fetch and store news data
async function runNewsFetchAndStore() {
  const { db } = await connectToDatabase();
  try {
    const newsData = await fetchNewsData();
    // Check if news data is present and correctly structured
    if (newsData && newsData.data) {
      // Ensure this matches the real structure
      await storeNewsData(db, newsData.data);
      console.log("News data fetched and stored successfully");
    } else {
      console.log("No news data to store");
    }
  } catch (error) {
    console.error("Error during news data fetch and storage:", error);
  }
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await runNewsFetchAndStore();
      res.status(200).json({
        message:
          "News data fetching triggered manually and processed successfully.",
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch and store news data",
        error: error.toString(),
      });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
