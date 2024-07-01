import { connectToDatabase } from "@/pages/api/db";
// import { hashPassword } from "@/pages/lib/auth";
import bcrypt from "bcryptjs";

async function signupHandler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const data = req.body;
  const { email, password } = data;

  if (
    !email ||
    !password ||
    password.length < 7 ||
    !email.includes("@") ||
    !email.includes(".")
  ) {
    res.status(400).json({ message: "Invalid email or password." });
    return;
  }

  try {
    const { db } = await connectToDatabase();

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      res.status(422).json({ message: "User already exists!" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await db
      .collection("users")
      .insertOne({ email, password: hashedPassword });

    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export default signupHandler;
