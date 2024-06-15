import fetch from "node-fetch";
import { connectToDatabase } from "@/pages/lib/db";

// Fetch job data from API
async function fetchJobData() {
  const url =
    "https://linkedin-api8.p.rapidapi.com/search-jobs-v2?keywords=software%20engineer%20software%20developer&locationId=101165590&datePosted=pastWeek&sort=mostRecent";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": process.env.RAPIDAPI_HOST,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP status ${response.status}`);
    const data = await response.json(); // Ensure JSON parsing
    return data; // Directly return the parsed data
  } catch (error) {
    console.error("Failed to fetch job data:", error);
    throw error; // Rethrow the error to handle it in the caller
  }
}

// Store job data in MongoDB and manage collection size
async function storeJobData(db, jobs) {
  const collection = db.collection("jobs");
  // Upsert jobs
  for (const job of jobs) {
    await collection.updateOne(
      { job_urn: job.id }, // Assuming job data has an `id` field
      { $set: job },
      { upsert: true }
    );
  }

  // Manage collection size
  const count = await collection.countDocuments();
  if (count > 250) {
    const oldest = await collection
      .find()
      .sort({ posted_time: 1 })
      .limit(50)
      .toArray();
    for (const doc of oldest) {
      await collection.deleteOne({ _id: doc._id });
    }
    console.log(
      `Deleted ${oldest.length} old jobs to maintain collection size.`
    );
  }
}

// Function to be called to fetch and store data
async function runJobFetchAndStore() {
  const { db } = await connectToDatabase();
  try {
    const jobData = await fetchJobData();
    if (jobData && jobData.data) {
      // Check if data is available
      await storeJobData(db, jobData.data); // Assuming the API returns an object with a data key
      console.log("Job data fetched and stored successfully");
    } else {
      console.log("No job data to store");
    }
  } catch (error) {
    console.error("Error during job data fetch and storage:", error);
  }
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await runJobFetchAndStore();
      res.status(200).json({
        message:
          "Job data fetching triggered manually and processed successfully.",
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch and store job data",
        error: error.toString(),
      });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
