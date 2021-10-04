import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { detailsProduct, updateProduct } from 'src/apis/productAPI';
import { productUpdateActions } from 'src/slice/ProductSlice';
import { useImageHandlers } from './useImageHandlers';
import Form from 'src/layouts/Form';
import CustomInput from 'src/components/CustomInput';
import ImageSection from 'src/components/Product/ProductEditScreen/ImageSection';

/* TODO extract logic to custom hook useProductEdit */
export default function ProductEditScreen({ history, match }: RouteProps<MatchParams>) {
  const dispatch = useDispatch();
  const productId = match.params.id;
  const productDetails: ProductDetailType = useSelector((state: AppState) => state.productDetails);
  const { product, loading, error } = productDetails;
  const productUpdate: StatusType = useSelector((state: AppState) => state.productUpdate);

  const [name, setName] = useState(product?.name);
  const [price, setPrice] = useState(product?.price);
  const [deal, setDeal] = useState(product?.deal);
  const [ship, setShip] = useState(product?.ship);
  const [video, setVideo] = useState(product?.video);
  const [images, setImages] = useState(product?.image?.split('^'));
  const [category, setCategory] = useState(product?.category);
  const [countInStock, setCountInStock] = useState(product?.countInStock);
  const [brand, setBrand] = useState(product?.brand);
  const [description, setDescription] = useState(product?.description);
  const imageSectionProps = useImageHandlers(product, images, setImages);

  useEffect(() => {
    if (productUpdate.success) {
      history.push('/product-list');
      dispatch(productUpdateActions._RESET(''));
      dispatch(detailsProduct(productId));
      return;
    }
    if (!product || product._id !== productId) {
      dispatch(productUpdateActions._RESET(''));
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

  const submitHandler = (e: EventType) => {
    e.preventDefault();
    // TODO: dispatch update product
    const _id = productId;
    const image = images.join('^');
    const seller = product.seller;
    dispatch(
      updateProduct({ name, price, deal, ship, video, category, brand, countInStock, description, _id, image, seller })
    );
  };

  return (
    <div className="product-edit">
      {productDetails?.success && (
        <Form
          header={`Edit Product ${productId}`}
          statusOf={{ loading, error, ...productUpdate }}
          onSubmit={submitHandler}
          btn="Update"
        >
          <CustomInput text="Product Name" hook={[name, setName]} />
          <CustomInput text="Price" hook={[price, setPrice]} />
          <CustomInput text="Ship" hook={[ship, setShip]} />
          <CustomInput text="Deal" hook={[deal, setDeal]} />

          <ImageSection images={images} imgHandlers={imageSectionProps} />
          <CustomInput text="Video Link or Youtube VID" hook={[video, setVideo]} />
          <CustomInput text="Category" hook={[category, setCategory]} />
          <CustomInput text="Brand" hook={[brand, setBrand]} />
          <CustomInput text="Count In Stock" hook={[countInStock, setCountInStock]} />
          <CustomInput text="Description" textarea rows={3} hook={[description, setDescription]} />
        </Form>
      )}
    </div>
  );
}
