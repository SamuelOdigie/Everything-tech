import { connectToDatabase } from "@/pages/lib/db"; // Adjust the path as necessary

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { page = 1, limit = 10 } = req.query;
      const { db } = await connectToDatabase();
      const jobsCollection = db.collection("jobs");

      // Calculate the total number of documents
      const count = await jobsCollection.countDocuments();

      // Fetching data from MongoDB with pagination and sorting by date descending
      const jobs = await jobsCollection
        .find({})
        .sort({ postAt: -1 }) // Sort by 'postedAt' field descending
        .skip((parseInt(page) - 1) * parseInt(limit))
        .limit(parseInt(limit))
        .toArray();

      res.status(200).json({ jobs, count });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
