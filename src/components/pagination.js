import "../stylesheet/pagination.css";

const Pagination = ({ contentPerPage, totalPost, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPost / contentPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <nav>
        <ul className="pagination">
          <button>left</button>
          {pageNumbers.map((num) => {
            return (
              <li key={num} className="page-item">
                <button
                  className="page-link"
                  onClick={() => {
                    paginate(num);
                  }}
                >
                  {num}
                </button>
              </li>
            );
          })}
          <button>right</button>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
