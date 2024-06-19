import { connectToDatabase } from "@/pages/lib/db"; // Adjust this import based on your project setup

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { db } = await connectToDatabase();
    const { topic, text } = req.body;

    try {
      const feedback = await db.collection("feedback").insertOne({
        topic,
        text,
        createdAt: new Date(),
      });

      res
        .status(201)
        .json({
          message: "Feedback submitted successfully",
          id: feedback.insertedId,
        });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to submit feedback", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
