const Pagination = ({ currentPage, newsPerPage, totalNews, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalNews / newsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex justify-center space-x-2 mt-4">
        {pageNumbers.map((number) => {
          console.log("Page Number:", number); // Debug: Check page number in the loop
          return (
            <li
              key={number}
              className={`inline-block ${
                currentPage === number ? "text-red-500" : "text-blue-500"
              }`}
            >
              <button
                onClick={() => paginate(number)}
                className={`hover:text-blue-600 focus:outline-none ${
                  currentPage === number ? "underline font-bold" : ""
                }`}
              >
                {number}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
