import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { detailsProduct, updateProduct } from 'src/apis/productAPI';
import { productUpdateActions } from 'src/slice/ProductSlice';
import ImageSection from './ImageSection';
import CustomInput from 'src/components/CustomInput';
import LoadingOrError from 'src/components/LoadingOrError';
import Header from 'src/layouts/Header';
import Button from 'src/components/Button';

export default function ProductEditScreen({ history, match }) {
  const dispatch = useDispatch();
  const productId = match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;
  const productUpdate = useSelector((state) => state.productUpdate);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [deal, setDeal] = useState('');
  const [ship, setShip] = useState('');
  const [video, setVideo] = useState('');
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (productUpdate.success) {
      history.push('/product-list');
      dispatch(productUpdateActions._RESET());
      dispatch(detailsProduct(productId));
      return;
    }
    if (!product || product._id !== productId) {
      dispatch(productUpdateActions._RESET());
      dispatch(detailsProduct(productId));
      return;
    }
    setName(product.name);
    setPrice(product.price);
    setDeal(product.deal);
    setShip(product.ship);
    setVideo(product.video);
    setImages(product.image.split('^'));
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setBrand(product.brand);
    setDescription(product.description);
  }, [product, dispatch, productId, productUpdate.success, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product
    const _id = productId;
    const image = images.join('^');
    dispatch(updateProduct({ name, price, deal, ship, video, category, brand, countInStock, description, _id, image }));
  };

  return (
    <div className="product-edit">
      <form className="form" onSubmit={submitHandler}>
        <Header>Edit Product ${productId}</Header>
        <LoadingOrError xl statusOf={productDetails} />
        {productDetails?.success && (
          <>
            <LoadingOrError xl statusOf={productUpdate} />

            <CustomInput text="Name" hook={[name, setName]} />
            <CustomInput text="Price" hook={[price, setPrice]} />
            <CustomInput text="Ship" hook={[ship, setShip]} />
            <CustomInput text="Deal" hook={[deal, setDeal]} />

            <ImageSection images={images} setImages={setImages} />
            <CustomInput text="Video Link or Youtube VID" hook={[video, setVideo]} />
            <CustomInput text="Category" hook={[category, setCategory]} />
            <CustomInput text="Brand" hook={[brand, setBrand]} />
            <CustomInput text="Count In Stock" hook={[countInStock, setCountInStock]} />
            <CustomInput text="Description" textarea rows="3" hook={[description, setDescription]} />

            <Button primary fill type="submit" className="mt-2" label="Update" />
          </>
        )}
      </form>
    </div>
  );
}
