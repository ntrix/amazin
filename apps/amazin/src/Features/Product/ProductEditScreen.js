import axiosClient from '../../utils/axiosClient';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  detailsProduct,
  updateProduct
} from '../../Controllers/productActions';
import { productUpdateActions } from './ProductSlice';

import LoadingOrError from '../../components/LoadingOrError';
import MessageBox from '../../components/MessageBox';
import CustomInput from '../../components/CustomInput';
import { MAX_IMAGES } from '../../constants';
import { getImgUrl } from '../../utils';

export default function ProductEditScreen({ history, match }) {
  const dispatch = useDispatch();
  const productId = match.params.id;
  const { userInfo } = useSelector((state) => state.userSignin);
  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;
  const productUpdate = useSelector((state) => state.productUpdate);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [deal, setDeal] = useState('');
  const [ship, setShip] = useState('');
  const [video, setVideo] = useState('');
  const [images, setImages] = useState([]);
  const [upload, setUpload] = useState({ loading: false });
  const [imagePreview, setImagePreview] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [info, setInfo] = useState('');

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
    dispatch(
      updateProduct({
        name,
        price,
        deal,
        ship,
        video,
        category,
        brand,
        countInStock,
        description,
        _id: productId,
        image: images.join('^')
      })
    );
  };

  const asyncUpdateImgs = async (newImages, bodyFormData, updateInfo) => {
    setUpload({ loading: true });
    try {
      await axiosClient.patch('/api/uploads', bodyFormData, {
        headers: {
          enctype: 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`
        }
      });
      setImages(newImages);
      setInfo(updateInfo);
      setUpload({ loading: false });
    } catch ({ message }) {
      setUpload({ loading: false, error: message });
    }
  };

  const handleAddImgs = (e) => {
    const bodyFormData = new FormData();
    const { files } = e.target;
    const uploadImgsCount = files.length;
    const uploadSize = Math.min(uploadImgsCount, MAX_IMAGES - images.length);

    const uploadImgs = Array.from(files).slice(0, uploadSize);
    uploadImgs.forEach((img) => bodyFormData.append('images', img));
    bodyFormData.append('productId', product._id);
    asyncUpdateImgs(
      [...images, ...uploadImgs],
      bodyFormData,
      `${uploadSize} Images successfully uploaded!`
    );
  };

  const handleDeleteImg = (idx) => (e) => {
    e.preventDefault();
    if (!window.confirm('Do you really want to delete this image?')) return;

    /* TODO: delete image on cloudinary and update immediately to DB */
    const newImages = images.filter((_, i) => i !== idx);
    const bodyFormData = new FormData();
    bodyFormData.append('imgLink', images[idx]);
    bodyFormData.append('productId', product._id);
    bodyFormData.append('image', newImages.join('^'));
    asyncUpdateImgs(newImages, bodyFormData);
  };

  const handleUpdateImgLink = (id) => (e) => {
    const newImages = images.slice();
    newImages[id] = e.target.value;
    setImages(newImages);
  };

  const handleMoveUpImg = (id) => (e) => {
    e.preventDefault();
    if (id > 0)
      setImages([
        ...images.slice(0, id - 1),
        images[id],
        images[id - 1],
        ...images.slice(id + 1)
      ]);
  };

  const handleAddImgLinkOnEnter = (e) => {
    if (e.key === 'Enter') setImages([...images, imagePreview]);
  };

  return (
    <div className="product-edit">
      <form
        className="form"
        onSubmit={submitHandler}
        // encType="multipart/form-data"
      >
        <div>
          <h1>Edit Product {productId}</h1>
        </div>

        <LoadingOrError xl statusOf={productDetails} />

        {productDetails.success && (
          <>
            <LoadingOrError xl statusOf={productUpdate} />

            <CustomInput text="Name" hook={[name, setName]} />
            <CustomInput text="Price" hook={[price, setPrice]} />
            <CustomInput text="Ship" hook={[ship, setShip]} />
            <CustomInput text="Deal" hook={[deal, setDeal]} />

            <div>
              <label htmlFor="image-1-cover">
                Uploaded Images ({images.length} of {MAX_IMAGES})
                <p>(You can also enter extern Image Links here)</p>
              </label>

              {images.map((img, id) => (
                <div className="row img-input" key={id}>
                  <div className="tab__w6">
                    <img
                      onMouseEnter={() => setImagePreview(img)}
                      src={getImgUrl(product._id, img)}
                      alt={`Preview ${id + 1}`}
                      className="small"
                    />
                  </div>

                  <CustomInput
                    text={`Image ${id + 1} ${['COVER', '[DEAL]'][id] || ''}`}
                    className="row"
                    value={img}
                    onChange={handleUpdateImgLink(id)}
                  />

                  <button
                    onClick={handleMoveUpImg(id)}
                    disabled={upload.loading}
                  >
                    <i className="fa success tab__w3 fa-arrow-circle-up"></i>
                  </button>

                  <button
                    onClick={handleDeleteImg(id)}
                    disabled={upload.loading}
                  >
                    <i className="fa danger fa-close"></i>
                  </button>
                </div>
              ))}
            </div>

            <div className="row center">
              <img
                src={getImgUrl(product._id, imagePreview)}
                alt="Preview"
                className="mt-1 medium"
              />
            </div>

            {images.length < MAX_IMAGES && (
              <div>
                Add
                <CustomInput
                  text="New Images"
                  name="images"
                  type="file"
                  multiple
                  onChange={handleAddImgs}
                />
                Or
                <CustomInput
                  text="Image Link"
                  hook={[imagePreview, setImagePreview]}
                  onKeyUp={handleAddImgLinkOnEnter}
                />
                <LoadingOrError statusOf={upload} />
                <MessageBox variant="info" msg={info} />
              </div>
            )}

            <CustomInput
              text="Video Link or Youtube VID"
              hook={[video, setVideo]}
            />
            <CustomInput text="Category" hook={[category, setCategory]} />
            <CustomInput text="Brand" hook={[brand, setBrand]} />
            <CustomInput
              text="Count In Stock"
              hook={[countInStock, setCountInStock]}
            />
            <CustomInput
              text="Description"
              textarea
              rows="3"
              hook={[description, setDescription]}
            />
            <br />

            <div>
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
