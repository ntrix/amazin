import React from "react";

export default function Rating({ rating, numReviews, caption, steps = 5 }) {
  return (
    <div className="rating">
      <span>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].slice(0, steps).map((star) => (
          <i
            className={
              star <= rating + 0.5
                ? star === rating + 0.5
                  ? "fa fa-star-half-o"
                  : "fa fa-star"
                : "fa fa-star-o"
            }
            key={star}
          ></i>
        ))}
      </span>

      {caption ? (
        <span>{caption}</span>
      ) : (
        <span>{" " + numReviews + " review" + (rating > 1 ? "s" : "")}</span>
      )}
    </div>
  );
}
