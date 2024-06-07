import { connectToDatabase } from "@/pages/lib/db";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST requests allowed" });
  }

  try {
    const { email, password } = req.body;
    const client = await connectToDatabase();
    const db = client.db();

    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).send({ message: "Invalid credentials" });
    }

    // Here you would typically issue a token or set a session
    res.status(200).send({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({ message: "Internal server error" });
  }
}
