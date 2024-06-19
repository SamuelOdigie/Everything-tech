const JobItem = ({ job }) => {
  return (
    <div className="p-4 border rounded shadow">
      <h2 className="font-bold text-xl mb-2">{job.title}</h2>
      <h3 className="font-semibold">{job.company.name}</h3>
      <p className="text-gray-700">{job.location}</p>
      <p className="text-green-700">{job.benefits}</p>
      <p className="text-gray-700 ">
        {new Date(job.postAt).toLocaleDateString()}
      </p>
      <a
        href={job.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        View Job
      </a>
    </div>
  );
};

export default JobItem;
