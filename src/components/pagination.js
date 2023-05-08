import { useEffect } from "react";
import "../stylesheet/pagination.css";

const Pagination = ({ contentPerPage, totalPost, paginate, currentPage }) => {
  const end = Math.ceil(totalPost / contentPerPage);
  let pageNumbers = [];

  if (end <= 5) {
    for (let i = 1; i <= end; i++) {
      pageNumbers.push(i);
    }
  } else {
    pageNumbers = [1, 2, 3, 4, 5, 6];
  }

  const backward = () => {
    if (currentPage != 1) {
      paginate(--currentPage);
    }
  };

  const forward = () => {
    if (currentPage != end) {
      paginate(++currentPage);
    }
  };

  useEffect(() => {
    const input = document.getElementById("input");
    input.addEventListener("focus", () => {
      input.value = "";
    });
  });

  const navigate = () => {
    const value = document.getElementById("input").value;
    if (value >= 1 && value <= end) {
      paginate(value);
    }
  };

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <button id="prev" className="page-link" onClick={backward}>
            &#8592;
          </button>
        </li>
        {pageNumbers.slice(0, -1).map((num) => {
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
        <li className="page-item">
          <form onSubmit={navigate}>
            <input
              id="input"
              className="page-link"
              type="number"
              placeholder="..."
              autoComplete="off"
            />
          </form>
        </li>
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => {
              paginate(end);
            }}
          >
            {end}
          </button>
        </li>
        <li className="page-item">
          <button id="next" className="page-link" onClick={forward}>
            &#8594;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
