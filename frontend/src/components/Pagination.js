import React from "react";
import { Link } from "react-router-dom";

export default function Pagination({ page, pages, getUrl, help }) {
  return (
    <>
      <div className="row center pagination">
        {[...Array(pages || 0).keys()].map((x) => (
          <Link
            className={x + 1 === page ? "active" : ""}
            key={x}
            to={getUrl({ page: x + 1 })}
          >
            {x + 1}
          </Link>
        ))}
      </div>
      {help && (
        <div>
          <h2>Do you need help?</h2>
          <p>
            Visit the{" "}
            <Link to="/customer">
              <b>help section</b>
            </Link>
            {" or "}
            <Link to="/contact/subject/Help">
              <b>contact us</b>
            </Link>
            <br />
            <br />
          </p>
        </div>
      )}
    </>
  );
}
