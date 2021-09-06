import { useState } from 'react';
import { useSelector } from 'react-redux';

import axiosClient from 'src/apis/axiosClient';
import { MAX_IMAGES } from 'src/constants';

const config = (userInfo) => ({
  headers: {
    enctype: 'multipart/form-data',
    Authorization: `Bearer ${userInfo.token}`
  }
});

export function useAsyncUpload(setImages) {
  const { userInfo } = useSelector((state) => state.userSignin);
  const [uploadState, setUploadState] = useState({ loading: false });

  const asyncUploadImgs = async (images, bodyFormData, msg, method) => {
    setUploadState({ loading: true });
    try {
      if (method === 'post') {
        const { data } = await axiosClient.post('/api/uploads', bodyFormData, config(userInfo));
        setImages([...images, ...data]);
        setUploadState({ loading: false, msg });
        return;
      }
      await axiosClient.patch('/api/uploads', bodyFormData, config(userInfo));
      setImages(images);
      setUploadState({ loading: false });
    } catch ({ message }) {
      setUploadState({ loading: false, error: message });
    }
  };
  return { uploadState, asyncUploadImgs };
}

export function useImgFileHandlers(product, images, setImages) {
  const { uploadState, asyncUploadImgs } = useAsyncUpload(setImages);

  const addImgs = ({ target: { files } }) => {
    const bodyFormData = new FormData();
    const maxFiles = Math.min(files.length, MAX_IMAGES - images.length);

    for (let i = 0; i < maxFiles; i++) bodyFormData.append('images', files[i]);
    bodyFormData.append('productId', product._id);
    asyncUploadImgs(images, bodyFormData, `${maxFiles} Images successfully uploaded!`, 'post');
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
    asyncUploadImgs(newImages, bodyFormData);
  };
  return { uploadState, addImgs, deleteImg };
}

export function useImgLinkHandlers(product, images, setImages) {
  const updateImgLink = (id) => (e) => setImages(images.map((img, i) => (i === id ? e.target.value : img)));

  const moveUpImg = (id) => (e) => {
    e.preventDefault();
    if (id > 0) setImages([...images.slice(0, id - 1), images[id], images[id - 1], ...images.slice(id + 1)]);
  };

  const addImgOnEnter = (img) => (e) => e.key === 'Enter' ? setImages([...images, img]) : null;

  return { updateImgLink, moveUpImg, addImgOnEnter };
}
