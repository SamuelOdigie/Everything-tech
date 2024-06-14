import fetch from "node-fetch";
import { connectToDatabase } from "@/pages/lib/db";
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

  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`HTTP status ${response.status}`);
  return response.json(); // Assuming the response is JSON
}

// Store job data in MongoDB and manage collection size
async function storeJobData(db, jobs) {
  const collection = db.collection("jobs");
  // Upsert jobs
  for (const job of jobs) {
    await collection.updateOne(
      { job_urn: job.job_urn },
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

// Function to be called by cron and the handler
async function runJobFetchAndStore() {
  const { db } = await connectToDatabase();
  const jobData = await fetchJobData();
  await storeJobData(db, jobData.data); // Assuming the jobData contains the array of job listings
  console.log("Job data fetched and stored successfully");
}

// Schedule the job fetch and store to run every 24 hours
cron.schedule("0 0 * * *", runJobFetchAndStore);

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await runJobFetchAndStore();
      res
        .status(200)
        .json({
          message:
            "Job data fetching triggered manually and processed successfully.",
        });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Failed to fetch and store job data",
          error: error.toString(),
        });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
