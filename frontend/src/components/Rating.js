import React from "react";

export default function Rating(props) {
  const { rating, numReviews, caption } = props;
  return (
    <div className="rating">
      <span>
        {[1, 2, 3, 4, 5].map((star) => (
          <i
            className={
              star <= rating + 0.5
                ? star == rating + 0.5
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
        <span>{numReviews + " review" + (rating > 1 ? "s" : "")}</span>
      )}
    </div>
  );
}
