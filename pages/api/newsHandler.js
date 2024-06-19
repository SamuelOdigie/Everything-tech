import { connectToDatabase } from "@/pages/lib/db"; // Adjust the path as necessary

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { page = 1, limit = 10 } = req.query;
      const { db } = await connectToDatabase();
      const newsCollection = db.collection("news");

      // Calculate the total number of documents
      const count = await newsMaxItemsCollection.countDocuments();

      // Fetching data from MongoDB with pagination and sorting by published date descending
      const newsItems = await newsCollection
        .find({})
        .sort({ published_datetime_utc: -1 }) // Sort by 'published_datetime_utc' field descending
        .skip((parseInt(page) - 1) * parseInt(limit))
        .limit(parseInt(limit))
        .toArray();

      res.status(200).json({ news: newsItems, count });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
