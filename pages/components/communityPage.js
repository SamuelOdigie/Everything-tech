import Image from "next/image";
import React from "react";

const CommunityPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-6">Join Our Discord Community!</h1>
        <p className="text-lg text-gray-700 mb-4">
          Discover a space where tech enthusiasts and industry professionals
          connect and thrive. Explore new opportunities, gain insights, and
          build lasting relationships in our dynamic Discord community.
        </p>
        <a
          href="https://discord.com/channels/1252049376591872020/1252129472828936274"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
          width={160}
          height={30}
            src="https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/636e0b5061df29d55a92d945_full_logo_blurple_RGB.svg"
            alt="Join Discord"
            className="mx-auto"
          />
          <div className="text-blue-500 hover:text-blue-700 font-bold">
            Click Here to Join Now!
          </div>
        </a>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold">Why Join Our Discord?</h2>
          <ul className="list-disc list-inside">
            <li>Interactive live sessions and real-time collaboration.</li>
            <li>Exclusive workshops, webinars, and guest talks.</li>
            <li>
              Personal and professional growth through active networking and
              mentorship.
            </li>
            <li>
              Dedicated channels for various tech topics, job opportunities, and
              project collaborations.
            </li>
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold">Community Highlights</h2>
          <ul className="list-disc list-inside">
            <li>Weekly challenges and hackathons with prizes.</li>
            <li>
              Monthly member spotlights to showcase your projects and
              achievements.
            </li>
            <li>
              Active participation in open source projects and community-driven
              development.
            </li>
            <li>Supportive environment for beginners and experts alike.</li>
          </ul>
        </div>
      </div>
      <section className="text-center mb-12">
        <h2 className="text-2xl font-bold mb-6">See Discord in Action</h2>
        <Image
        width={350}
        height={200}
          src="https://support.discord.com/hc/article_attachments/11475724079383"
          alt="Discord Interface"
          className="mx-auto max-w-lg h-auto"
          style={{ width: "50%" }}
        />
      </section>

      <section className="bg-gray-100 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          Become a Part of Something Bigger
        </h2>
        <p className="text-center text-gray-700 mb-6">
          Don`t miss out on the opportunity to grow personally and
          professionally. Join us today and start engaging with a global
          community!
        </p>
        <div className="text-center">
          <a
            href="https://discord.com/channels/1252049376591872020/1252129472828936274"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
            width={160}
            height={30}
              src="https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/636e0b5061df29d55a92d945_full_logo_blurple_RGB.svg"
              alt="Sign Up for Discord"
              className="w-40 mx-auto"
            />
            <div className="text-green-500 hover:text-green-700 font-bold">
              Click Here to Sign Up for Free!
            </div>
          </a>
        </div>
      </section>
    </div>
  );
};

export default CommunityPage;
