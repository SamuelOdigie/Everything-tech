import { connectToDatabase } from "@/pages/lib/db";
import { hashPassword } from "@/pages/lib/auth";

async function signupHandler(req, res) {
  const data = req.body;
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  try {
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

    const client = connectToDatabase();
    const db = client.db();

    const hashedPassword = await hashPassword(password);
    const result = await db
      .collection("users")
      .insertOne({ email: email, password: hashedPassword });

    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export default signupHandler;
