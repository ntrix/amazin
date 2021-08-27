import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axiosClient from '../../../apis/axiosClient';

import LoadingOrError from '../../../components/LoadingOrError';
import MessageBox from '../../../components/MessageBox';
import CustomInput from '../../../components/CustomInput';
import { MAX_IMAGES } from '../../../constants';
import { getImgUrl } from '../../../utils';

function ImageSection({ hook: [images, setImages] }) {
  const { userInfo } = useSelector((state) => state.userSignin);
  const { product } = useSelector((state) => state.productDetails);

  const [uploadState, setUploadState] = useState({ loading: false });
  const [imagePreview, setImagePreview] = useState('');
  const [uploadInfo, setUploadInfo] = useState('');

  const asyncUpdateImgs = async (_images, bodyFormData, updateInfo, method) => {
    setUploadState({ loading: true });
    try {
      const headers = {
        enctype: 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`
      };
      if (method === 'post') {
        const { data } = await axiosClient.post('/api/uploads', bodyFormData, {
          headers
        });
        setImages([..._images, ...data]);
        setUploadInfo(updateInfo);
      } else {
        await axiosClient.patch('/api/uploads', bodyFormData, { headers });
        setImages(_images);
      }
      setUploadState({ loading: false });
    } catch ({ message }) {
      setUploadState({ loading: false, error: message });
    }
  };

  const handleAddImgs = (e) => {
    const bodyFormData = new FormData();
    const { files } = e.target;
    const uploadImgsCount = files.length;
    const maxFiles = Math.min(uploadImgsCount, MAX_IMAGES - images.length);

    for (let i = 0; i < maxFiles; i++) bodyFormData.append('images', files[i]);
    bodyFormData.append('productId', product._id);
    asyncUpdateImgs(
      images,
      bodyFormData,
      `${maxFiles} Images successfully uploaded!`,
      'post'
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
    <>
      <div>
        <label htmlFor="image-1-cover">
          Uploaded Images ({images.length} of {MAX_IMAGES})
          <p>(You can also enter extern Image Links here)</p>
        </label>

        {images.map((img, id) => (
          <div className="row img-row" key={id}>
            <img
              alt={`Preview ${id + 1}`}
              className="small"
              src={getImgUrl(product._id, img)}
              onMouseEnter={() => setImagePreview(img)}
            />

            <CustomInput
              text={`Image ${id + 1}. ${['COVER', '[DEAL]'][id] || ''}`}
              wrapClass="img-row__input"
              className="row"
              value={img}
              onChange={handleUpdateImgLink(id)}
            />

            <button
              disabled={uploadState.loading}
              onClick={handleDeleteImg(id)}
            >
              <i className="fa danger fa-close"></i>
            </button>

            <button
              disabled={uploadState.loading}
              onClick={handleMoveUpImg(id)}
            >
              <i className="fa success tab__w3 fa-arrow-circle-up"></i>
            </button>
          </div>
        ))}
      </div>

      <div className="row center">
        <img
          alt="Preview"
          className="mt-1 medium"
          src={getImgUrl(product._id, imagePreview)}
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
          <LoadingOrError statusOf={uploadState} />
          <MessageBox variant="info" msg={uploadInfo} />
        </div>
      )}
    </>
  );
}

export default ImageSection;
