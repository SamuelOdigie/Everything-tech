import { connectToDatabase } from "@/pages/api/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST requests allowed" });
  }

  try {
    const { email, password } = req.body;
    const { db } = await connectToDatabase();

    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).send({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    console.log("token generated", token);

    res.setHeader(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age 7200; Secure; Samesite-Strict`
    );

    res.status(200).json({ message: "Login successful!", token: token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({ message: "Internal server error" });
  }
}
