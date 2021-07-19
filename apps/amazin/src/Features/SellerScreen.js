import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listProducts } from '../Controllers/productActions';
import { detailsUser } from '../Controllers/userActions';

import ProductCard from '../components/ProductCard';
import Rating from '../components/Rating';
import Pagination from '../components/Pagination';
import { useParams } from 'react-router';
import SortFilter from '../components/SortFilter';

import MessageBox from '../components/MessageBox';
import LoadingOrError from '../components/LoadingOrError';

export default function SellerScreen({ match }) {
  const dispatch = useDispatch();
  const { pageNumber = 1, order: pOrder = 'bestselling' } = useParams();
  const sellerId = match.params.id;
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const productList = useSelector((state) => state.productList);
  const { products, page, pages, count } = productList;

  const getUrl = ({ order = pOrder, page: _page = pageNumber }) =>
    `/seller/${sellerId}/order/${order}/pageNumber/${_page}`;

  useEffect(() => {
    dispatch(detailsUser(sellerId));
    dispatch(listProducts({ seller: sellerId, order: pOrder, pageNumber }));
  }, [dispatch, sellerId, pOrder, pageNumber]);

  return (
    <div className="row top">
      <div className="row search__banner">
        <LoadingOrError statusOf={productList} />

        {products && (
          <div className="search__counter">
            {products.length} of {count} Products from this Seller
          </div>
        )}
      </div>
      <div className="col-1">
        <LoadingOrError statusOf={userDetails} />

        {user && (
          <ul className="card card__body">
            <li>
              <div className="row start">
                <div className="p-1">
                  <img
                    className="small"
                    src={user.seller.logo}
                    alt={user.seller.name}
                  ></img>
                </div>

                <div className="p-1">
                  <h1>{user.seller.name}</h1>
                </div>
              </div>
            </li>

            <li>
              <Rating
                rating={user.seller.rating}
                numReviews={user.seller.numReviews}
              ></Rating>
            </li>

            <li>
              <a href={`mailto:${user.email}`}>Contact Seller</a>
            </li>

            <li>{user.seller.description}</li>

            <li className="p-1">
              <SortFilter order={pOrder} getUrl={getUrl} />
            </li>
          </ul>
        )}
      </div>
      <div className="col-3 mt-1 p-1">
        <LoadingOrError xl statusOf={productList} />

        <Pagination page={page} pages={pages} getUrl={getUrl} />

        <MessageBox hide={products?.length < 1}>No Product Found</MessageBox>

        <div className="row center">
          {products?.map((product) => (
            <ProductCard key={product._id} product={product}></ProductCard>
          ))}
        </div>

        <Pagination page={page} pages={pages} getUrl={getUrl} help />
      </div>
    </div>
  );
}
