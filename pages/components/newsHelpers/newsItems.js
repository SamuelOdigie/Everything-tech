const NewsItem = ({ news }) => {
  return (
    <div className="p-4 border rounded shadow flex">
      <img src={news.photo_url} alt="News" className="w-1/3 mr-4" />
      <div className="w-2/3">
        <h2 className="font-bold text-xl mb-2">{news.title}</h2>
        <div className="text-sm text-gray-600">
          {new Date(news.published_datetime_utc).toLocaleDateString()}
        </div>
        <a
          href={news.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
