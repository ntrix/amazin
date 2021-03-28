import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { productUpdateActions } from "./ProductSlice";
import {
  detailsProduct,
  updateProduct,
} from "../../Controllers/productActions";

import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { getImgUrl, MAX_IMAGES, NO_IMAGE } from "../../utils";

export default function ProductEditScreen(props) {
  const productId = props.match.params.id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [deal, setDeal] = useState("");
  const [ship, setShip] = useState("");
  const [video, setVideo] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState(NO_IMAGE);
  const [info, setInfo] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push("/product-list");
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch(productUpdateActions._RESET());
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setDeal(product.deal);
      setShip(product.ship);
      setVideo(product.video);
      setImages(product.image.split("^"));
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setDescription(product.description);
    }
  }, [product, dispatch, productId, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        deal,
        ship,
        video,
        image: images.join("^"),
        category,
        brand,
        countInStock,
        description,
      })
    );
  };
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const uploadFileHandler = async (e) => {
    const bodyFormData = new FormData();
    const { files } = e.target;
    const capacity = Math.min(files.length, MAX_IMAGES - images.length);

    for (let x = 0; x < capacity; x++) bodyFormData.append("images", files[x]);
    bodyFormData.append("productId", product._id);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post("/api/uploads", bodyFormData, {
        headers: {
          enctype: "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImages([...images, ...data]);
      if (capacity < files.length)
        setInfo(
          `You can upload ${MAX_IMAGES} Images total, the others will be ignore!`
        );
      else setInfo(`${capacity} Images successfully uploaded!`);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
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
        {loadingUpdate && <LoadingBox xl />}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox xl />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="ship">Ship</label>
              <input
                id="ship"
                type="text"
                placeholder="Enter shipping price"
                value={ship || ""}
                onChange={(e) => setShip(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="deal">Deal</label>
              <input
                id="deal"
                type="text"
                placeholder="Enter deal"
                value={deal || ""}
                onChange={(e) => setDeal(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="image__link--1">
                Uploaded Images ({images.length} of {MAX_IMAGES})
              </label>
              {images.map((img, id) => (
                <div className="row" key={id} draggable>
                  <div className="tab__w6">
                    <img
                      onMouseEnter={() => setImagePreview(img)}
                      src={getImgUrl(product, img)}
                      alt={"Image Preview" + (id + 1)}
                      className="small"
                    />
                  </div>
                  <label className="p-1" htmlFor={"image__link--" + (id + 1)}>
                    Image {id + 1} {!id && <h3>Cover</h3>}
                    {id === 1 && <p>Deal</p>}
                  </label>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (id > 0)
                        setImages([
                          ...images.slice(0, id - 1),
                          images[id],
                          images[id - 1],
                          ...images.slice(id + 1),
                        ]);
                    }}
                  >
                    <i className="fa success tab__w3 fa-arrow-circle-up"></i>
                  </button>

                  <div className="col-fill mr-1">
                    <input
                      id={"image__link--" + (id + 1)}
                      type="text"
                      className="row"
                      placeholder={"Enter image link" + (id + 1)}
                      value={img}
                      onChange={(e) =>
                        setImages(
                          images.map((_, i) => (i === id ? e.target.value : _))
                        )
                      }
                    ></input>
                  </div>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (
                        window.confirm(
                          "Do you really want to delete this image permanent?"
                        )
                      )
                        alert("deleted");
                    }}
                  >
                    <i className="fa danger fa-close"></i>
                  </button>
                </div>
              ))}
            </div>
            <div className="row center">
              <img
                src={getImgUrl(product, imagePreview || NO_IMAGE)}
                alt="New Image Preview"
                className="mt-1 medium"
              />
            </div>

            <div>
              <label htmlFor="images">Add New Image</label>
              {images.length < MAX_IMAGES && (
                <>
                  <input
                    type="file"
                    id="images"
                    name="images"
                    label="Choose Image"
                    onChange={uploadFileHandler}
                    multiple
                  ></input>
                  <input
                    type="text"
                    placeholder="Or enter your Image Link"
                    value={imagePreview}
                    onChange={(e) => setImages([...images, e.target.value])}
                  ></input>
                  {info && <MessageBox variant="info">{info}</MessageBox>}
                  {loadingUpload && <LoadingBox />}
                  {errorUpload && (
                    <MessageBox variant="danger">{errorUpload}</MessageBox>
                  )}
                </>
              )}
            </div>
            <div>
              <label htmlFor="video">Video Link/ Youtube VID</label>
              <input
                id="video"
                type="text"
                placeholder="Enter video link or Youtube video ID"
                value={video || ""}
                onChange={(e) => setVideo(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <input
                id="category"
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="brand">Brand</label>
              <input
                id="brand"
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="countInStock">Count In Stock</label>
              <input
                id="countInStock"
                type="text"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label></label>
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
