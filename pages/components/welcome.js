import React from "react";

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 py-8">
      <div className="text-center max-w-4xl">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Experience Simplicity with Our Tool Everything Tech!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your one-stop hub for everything technology. From the latest tech
          news, exciting job opportunities, comprehensive learning resources, to
          exclusive tech events — Everything Tech brings it all under one roof.
          Dive into a seamless experience tailored to boost your tech knowledge
          and career.
        </p>
        <div className="inline-block shadow-xl rounded-lg overflow-hidden">
          <video controls className="w-full" style={{ maxHeight: "450px" }}>
            <source src="tutorial" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
