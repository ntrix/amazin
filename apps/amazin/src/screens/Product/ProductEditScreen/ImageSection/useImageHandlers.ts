import { useState } from 'react';

import axiosClient from 'src/apis/axiosClient';
import { MAX_IMAGES } from 'src/constants';
import { useShadow } from 'src/hooks/useShadow';
import { getImgUrl } from 'src/utils';

const config = (userInfo: UserInfoType) => ({
  headers: {
    enctype: 'multipart/form-data',
    Authorization: `Bearer ${userInfo.token}`
  }
});

export function useAsyncUpload(setImages: SetState) {
  const { userInfo } = useShadow();
  const [uploadState, setUploadState] = useState<StatusType>({ loading: false });

  const asyncUploadImgs = async (images: string[], bodyFormData: FormData, msg?: string, method?: string) => {
    setUploadState({ loading: true });
    try {
      if (method === 'post') {
        const { data: newImgUrls } = await axiosClient.post('/api/uploads', bodyFormData, config(userInfo));
        setImages([...images, ...newImgUrls]);
        setUploadState({ loading: false, msg });
        return;
      }
      await axiosClient.patch('/api/uploads', bodyFormData, config(userInfo));
      setImages(images);
      setUploadState({ loading: false });
    } catch (error) {
      setUploadState({ loading: false, error: 'Upload error!' });
    }
  };
  return { uploadState, asyncUploadImgs };
}

export function useImgFileHandlers(product: ProductType, images: string[], setImages: SetState) {
  const { uploadState, asyncUploadImgs } = useAsyncUpload(setImages);

  const addImgs = ({ target: { files } }: EventType) => {
    const bodyFormData = new FormData();
    const maxFiles = Math.min(files.length, MAX_IMAGES - images.length);

    for (let i = 0; i < maxFiles; i++) bodyFormData.append('images', files[i]);
    bodyFormData.append('productId', product._id);
    asyncUploadImgs(images, bodyFormData, `${maxFiles} Images successfully uploaded!`, 'post');
  };

  const deleteImg = (e: EventType, id: number) => {
    e.preventDefault();
    if (!window.confirm('Do you really want to delete this image?')) return;
    /* TODO: delete image on cloudinary and update immediately to DB */
    const newImages = images.filter((_, i) => i !== id);
    const bodyFormData = new FormData();
    bodyFormData.append('imgLink', images[id]);
    bodyFormData.append('productId', product._id);
    bodyFormData.append('image', newImages.join('^'));
    asyncUploadImgs(newImages, bodyFormData);
  };
  return { uploadState, addImgs, deleteImg };
}

export function useImgLinkHandlers(product: ProductType, images: string[], setImages: SetState) {
  const updateImgLink = (e: EventType, id: number) => {
    const newImgs = images.slice(0);
    newImgs[id] = e.target.value;
    setImages(newImgs);
  };

  const moveUpImg = (e: EventType, id: number) => {
    e.preventDefault();
    if (id < 1) return;
    const newImgs = images.slice(0);
    [newImgs[id], newImgs[id - 1]] = [newImgs[id - 1], newImgs[id]];
    setImages(newImgs);
  };

  const addImgOnEnter = (e: EventType, img: string) => e.key === 'Enter' && setImages([...images, img]);

  const getSrc = (img: string) => getImgUrl(product._id, img);

  return { updateImgLink, moveUpImg, addImgOnEnter, getSrc };
}
