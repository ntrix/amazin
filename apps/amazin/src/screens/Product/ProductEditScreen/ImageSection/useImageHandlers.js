import { useState } from 'react';
import { useSelector } from 'react-redux';

import axiosClient from 'src/apis/axiosClient';
import { MAX_IMAGES } from 'src/constants';
import { getImgUrl } from 'src/utils';

const config = (userInfo) => ({
  headers: {
    enctype: 'multipart/form-data',
    Authorization: `Bearer ${userInfo.token}`
  }
});

export function useImageHandlers(images, setImages) {
  const { userInfo } = useSelector((state) => state.userSignin);
  const { product } = useSelector((state) => state.productDetails);
  const [uploadState, setUploadState] = useState({ loading: false });

  const asyncUpdateImgs = async (_images, bodyFormData, updateInfo, method) => {
    setUploadState({ loading: true });
    try {
      if (method === 'post') {
        const { data } = await axiosClient.post('/api/uploads', bodyFormData, config(userInfo));
        setImages([..._images, ...data]);
        setUploadState({ loading: false, msg: updateInfo });
        return;
      }
      await axiosClient.patch('/api/uploads', bodyFormData, config(userInfo));
      setImages(_images);
      setUploadState({ loading: false });
    } catch ({ message }) {
      setUploadState({ loading: false, error: message });
    }
  };

  const addImgs = (e) => {
    const bodyFormData = new FormData();
    const { files } = e.target;
    const uploadImgsCount = files.length;
    const maxFiles = Math.min(uploadImgsCount, MAX_IMAGES - images.length);

    for (let i = 0; i < maxFiles; i++) bodyFormData.append('images', files[i]);
    bodyFormData.append('productId', product._id);
    asyncUpdateImgs(images, bodyFormData, `${maxFiles} Images successfully uploaded!`, 'post');
  };

  const deleteImg = (idx) => (e) => {
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

  const updateImgLink = (id) => (e) => setImages(images.map((img, i) => (i === id ? e.target.value : img)));

  const moveUpImg = (id) => (e) => {
    e.preventDefault();
    if (id > 0) setImages([...images.slice(0, id - 1), images[id], images[id - 1], ...images.slice(id + 1)]);
  };

  const addImgOnEnter = (imagePreview) => (e) => e.key === 'Enter' ? setImages([...images, imagePreview]) : null;

  const getImgLink = (img) => getImgUrl(product._id, img);

  return { uploadState, addImgs, deleteImg, updateImgLink, moveUpImg, addImgOnEnter, getImgLink };
}
