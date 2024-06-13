import { connectToDatabase } from "@/pages/lib/db";
import fetch from "node-fetch";
import cron from "node-cron";

// Fetch job data from API
async function fetchJobData() {
  const url =
    "https://fresh-linkedin-profile-data.p.rapidapi.com/search-jobs?keywords=Software%20developer%20Software%20engineer&geo_code=101165590&date_posted=past_week&sort_by=most_recent&start=0&easy_apply=false&under_10_applicants=false";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": "fresh-linkedin-profile-data.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok)
      throw new Error(`API call failed with status ${response.status}`);
    console.log(await response.json());
  } catch (error) {
    console.error("Failed to fetch job data:", error);
    throw error; // Rethrow to handle it in the calling function
  }
}

// Store job data in MongoDB
async function storeJobData(db, jobs) {
  const collection = db.collection("jobs");
  const results = [];

  for (const job of jobs) {
    const updateResult = await collection.updateOne(
      { job_urn: job.job_urn },
      { $set: job },
      { upsert: true }
    );
    results.push(updateWebResult);
  }

  return results;
}

// Scheduled task to fetch and store jobs
cron.schedule("0 0 * * *", async () => {
  try {
    const db = await connectToDatabase();
    const jobData = await fetchJobData();
    const storeResults = await storeJobData(db, jobData);
    console.log("Job data fetched and stored successfully.", storeResults);
  } catch (error) {
    console.error("Error during scheduled job fetch:", error);
  }
});

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const db = await connectToDatabase();
      const jobData = await fetchJobData();
      const storeResults = await storeJobData(db, jobData);
      res.status(200).json({
        message: "Job data fetched and stored successfully.",
        results: storeResults,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to process job data",
        error: error.toString(),
      });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
