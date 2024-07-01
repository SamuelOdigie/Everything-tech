import React from "react";

const opportunities = [
  {
    id: 1,
    title: "Internship at JP Morgan",
    description:
      "Join JP Morgan for a rewarding summer internship in finance and technology. Gain hands-on experience with industry leaders.",
    imgUrl:
      "https://media.licdn.com/dms/image/D4D12AQFrClVB_xsRtg/article-cover_image-shrink_600_2000/0/1697177117474?e=2147483647&v=beta&t=pgkX0bEENh9yButYrHiYskxx39TfXWZWA4HdxHHnk0A", // Replace with actual image URL
    link: "https://careers.jpmorgan.com/",
  },
  {
    id: 2,
    title: "Free Bootcamp at Makers",
    description:
      "Dive into coding with Makers Academy's free bootcamp. Learn full-stack development over the course of 12 weeks.",
    imgUrl:
      "https://makers.tech/hubfs/Copy%20of%20Copy%20of%20Makers_230714_8626_LauraPalmer%20(1)%20(1).jpeg", // Replace with actual image URL
    link: "https://www.makersacademy.com/",
  },
  {
    id: 3,
    title: "Remote Role - No Experience Needed",
    description:
      "Start your career in tech with this entry-level, remote position. No prior experience required!",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQduW7MN74Y8Lwkk55YY8X829tbo-xJ9nxVDA&s", // Replace with actual image URL
    link: "https://example.com/remote-job",
  },
  {
    id: 4,
    title: "Scholarship Program at Tech University",
    description:
      "Apply now for a full scholarship at Tech University for the upcoming academic year. Open for all STEM fields.",
    imgUrl: "https://i.imgur.com/ahjHe3h.jpeg",
    link: "https://www.techuniversity.com/scholarships",
  },
];

const Opportunities = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Exclusive Opportunities
      </h1>
      <div className="grid md:grid-cols-2 gap-8">
        {opportunities.map((opportunity) => (
          <div
            key={opportunity.id}
            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img
                  height={192}
                  width={192}
                  src={opportunity.imgUrl}
                  alt={opportunity.title}
                  className="h-48 w-full object-cover md:w-48"
                />
              </div>
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-xl text-blue-800 mb-2">
                    {opportunity.title}
                  </h3>
                  <p className="text-gray-600 text-base">
                    {opportunity.description}
                  </p>
                </div>
                <a
                  href={opportunity.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 self-start bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                >
                  <span>Learn more</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Opportunities;
