import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ProductCard from "../components/ProductCard";
import { listProducts } from "../Controllers/productActions";
import { listTopSellers } from "../Controllers/userActions";
import Carousel from "../utils";

const breakpoints = {
  desktop: {
    breakpoint: { max: 4000, min: 720 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 720, min: 0 },
    items: 1,
  },
};

export default function HomeScreen() {
  const { banner } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;

  useEffect(() => {
    dispatch(listProducts({ pageSize: 12 }));
    dispatch(listTopSellers());
  }, [dispatch]);

  return (
    <div className={"home-screen " + banner}>
      <h2 className="home-screen__title">Top Sellers, Top Products</h2>
      {loadingSellers ? (
        <LoadingBox />
      ) : errorSellers ? (
        <MessageBox variant="danger">{errorSellers}</MessageBox>
      ) : (
        <>
          {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={true}
            responsive={breakpoints}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            keyBoardControl={true}
            customTransition="transform 1000ms ease-in-out"
            transitionDuration={1000}
            centerMode={true}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "desktop"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {sellers.map((seller) => (
              <div key={seller._id}>
                <Link className="seller__card" to={`/seller/${seller._id}`}>
                  <img
                    className="seller__img"
                    src={seller.seller.logo || ""}
                    alt={seller.seller.name || "Anonymous Seller"}
                  />
                  <p className="legend">
                    {seller.seller.name || "Anonymous Seller"}
                  </p>
                </Link>
              </div>
            ))}
          </Carousel>
        </>
      )}
      <h2 className="home-screen__title">Featured Products</h2>
      {loading ? (
        <LoadingBox xl />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="row center">
            {products.map((product) => (
              <ProductCard key={product._id} product={product}></ProductCard>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
