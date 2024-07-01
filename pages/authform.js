import { useState, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

async function createUser(email, password) {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
  return data;
}

async function loginUser(email, password) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
  return data;
}
function AuthForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {
      try {
        const result = await (isLogin
          ? loginUser(enteredEmail, enteredPassword)
          : createUser(enteredEmail, enteredPassword));
        console.log("Login/Create User result:", result);
        router.push("/dashboard");
        console.log("Redirecting to dashboard");
      } catch (error) {
        console.error("Error during login/signup:", error.message);
      }
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log(result);
        setMessage("Account created successfully! Please log in.");
        setIsLogin(true);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    }
  }

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
    setMessage(""); // Clear the message
    setError(""); // Clear the error
  }

  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold mb-4">
            {isLogin ? "Login" : "Sign Up"}
          </h1>
          {message && <div className="mb-4 text-green-600">{message}</div>}
          {error && <div className="mb-4 text-red-600">{error}</div>}
          <form onSubmit={submitHandler} autoComplete="off">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                required
                ref={emailInputRef}
                className="mt-1 p-2 focus:outline-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-800"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Your Password
              </label>
              <input
                type="password"
                id="password"
                required
                ref={passwordInputRef}
                className="mt-1 p-2 focus:outline-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-800"
              />
            </div>
            <button className="w-full bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md">
              {isLogin ? "Login" : "Create Account"}
            </button>
            <button
              type="button"
              className="mt-2 w-full bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md"
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </form>
        </div>
      </div>
      <div className="hidden lg:block relative w-1/2 bg-gray-200">
        <Image
          fill
          className="absolute inset-0 w-full h-full object-cover"
          src="https://www.citma.org.uk/static/4b1fdf5f-0a2c-4b04-b69584bb17e33367/790x526_highestperformance__4a7c7e45a350/Mentoring.jpg"
          alt="Authentication Background"
        />
      </div>
    </div>
  );
}

export default AuthForm;
