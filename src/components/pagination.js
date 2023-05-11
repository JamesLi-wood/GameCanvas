import { useState, useEffect } from "react";
import "../stylesheet/pagination.css";

const Pagination = ({ contentPerPage, totalPost, paginate, currentPage }) => {
  const [pageNumbers, setPageNumbers] = useState([]);
  const [fill, setFill] = useState(false);
  const end = Math.ceil(totalPost / contentPerPage);

  useEffect(() => {
    let arr = [];
    if (end <= 5) {
      for (let i = 1; i <= end; i++) {
        arr.push(i);
        setPageNumbers(arr);
        setFill(false);
      }
    } else {
      arr = [1, 2, 3, 4, 5, 6];
      setPageNumbers(arr);
      setFill(true);
    }
  }, []);

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
    if (fill) {
      const input = document.getElementById("input");
      input.addEventListener("focus", () => {
        input.value = "";
      });
    }
  });

  const navigate = (e) => {
    e.preventDefault();
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
        {fill && (
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
        )}
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
