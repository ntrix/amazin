import axiosClient from "../../Controllers/axiosClient";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  detailsProduct,
  updateProduct,
} from "../../Controllers/productActions";
import { productUpdateActions } from "./ProductSlice";

import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import CustomInput from "../../components/CustomInput";
import { getImgUrl, MAX_IMAGES } from "../../constants";

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
  const [imagePreview, setImagePreview] = useState("");
  const [info, setInfo] = useState("");
  const [fileUploading, setFileUploading] = useState(false);
  const [fileUploadErr, setFileUploadErr] = useState("");

  const { userInfo } = useSelector((state) => state.userSignin);

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
        image: images.join("^"),
      })
    );
  };

  const onAsyncImgUpload = async (e) => {
    const bodyFormData = new FormData();
    const { files } = e.target;
    const capacity = Math.min(files.length, MAX_IMAGES - images.length);

    for (let x = 0; x < capacity; x++) bodyFormData.append("images", files[x]);
    bodyFormData.append("productId", product._id);

    setFileUploading(true);
    try {
      const { data } = await axiosClient.post("/api/uploads", bodyFormData, {
        headers: {
          enctype: "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImages([...images, ...data]);
      if (capacity < files.length)
        setInfo(`You can upload ${MAX_IMAGES} Images total`);
      else setInfo(`${capacity} Images successfully uploaded!`);
      setFileUploading(false);
    } catch (err) {
      setFileUploadErr(err.message);
      setFileUploading(false);
    }
  };

  const onImgDelete = (idx) => (e) => {
    e.preventDefault();
    if (!window.confirm("Do you really want to delete this image?")) return;
    (async () => {
      const newImages = images.filter((_, i) => i !== idx);

      /* TODO: delete image on cloudinary and update immediately to DB */
      const bodyFormData = new FormData();
      bodyFormData.append("imgLink", images[idx]);
      bodyFormData.append("productId", product._id);
      bodyFormData.append("image", newImages.join("^"));

      setFileUploading(true);
      try {
        await axiosClient.patch("/api/uploads", bodyFormData, {
          headers: {
            enctype: "multipart/form-data",
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        setFileUploading(false);
      } catch (err) {
        setFileUploadErr(err.message);
        setFileUploading(false);
      }
      setImages(newImages);
    })();
  };

  const onImgMoveUp = (id) => (e) => {
    e.preventDefault();
    if (id > 0)
      setImages([
        ...images.slice(0, id - 1),
        images[id],
        images[id - 1],
        ...images.slice(id + 1),
      ]);
  };

  const addImageOnPressEnter = (e) => {
    if (e.key === "Enter" || e.keyCode === 13)
      setImages([...images, imagePreview]);
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

        <LoadingBox xl hide={!loadingUpdate} />
        <MessageBox variant="danger" msg={errorUpdate} />
        <LoadingBox xl hide={!loading} />
        <MessageBox variant="danger" msg={error} />

        {!loading && !error && (
          <>
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
                    text={`Image ${id + 1} ${["COVER", "[DEAL]"][id] || ""}`}
                    className="row"
                    value={img}
                    onChange={(e) =>
                      setImages(
                        images.map((_, i) => (i === id ? e.target.value : _))
                      )
                    }
                  />

                  <button onClick={onImgMoveUp(id)} disabled={fileUploading}>
                    <i className="fa success tab__w3 fa-arrow-circle-up"></i>
                  </button>

                  <button onClick={onImgDelete(id)} disabled={fileUploading}>
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

            <div>
              {images.length < MAX_IMAGES ? (
                <>
                  Add
                  <CustomInput
                    text="New Images"
                    name="images"
                    type="file"
                    multiple
                    onChange={onAsyncImgUpload}
                  />
                  Or
                  <CustomInput
                    text="Image Link"
                    hook={[imagePreview, setImagePreview]}
                    onKeyUp={addImageOnPressEnter}
                  />
                  <MessageBox variant="info" msg={info} />
                  <LoadingBox hide={!fileUploading} />
                  <MessageBox variant="danger" msg={fileUploadErr} />
                </>
              ) : (
                <label>
                  You have uploaded {images.length} of {MAX_IMAGES} Images
                </label>
              )}
            </div>

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
              textarea
              rows="3"
              text="Description"
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
