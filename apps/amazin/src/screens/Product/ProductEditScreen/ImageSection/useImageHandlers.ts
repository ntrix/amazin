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

export function useAsyncUpload(product: ProductType, setImages: SetStateType<string[]>) {
  const { userInfo } = useShadow();
  const [uploadState, setUploadState] = useState<StatusType>({ loading: false });

  const asyncImgHandler: FnType = async (imgUrls: string[], bodyFormData: FormData, uploadMessage?: string) => {
    setUploadState({ loading: true });
    bodyFormData.append('productId', product._id);

    try {
      if (uploadMessage) {
        // POST method for upload
        const { data: uploadedImgUrls } = await axiosClient.post('/api/uploads', bodyFormData, config(userInfo));
        setImages([...imgUrls, ...uploadedImgUrls]);
      } else {
        // PATCH method for delete
        await axiosClient.patch('/api/uploads', bodyFormData, config(userInfo));
        setImages(imgUrls);
      }
      setUploadState({ loading: false, msg: uploadMessage });
    } catch (error) {
      setUploadState({ loading: false, error: 'Upload error!' });
    }
  };
  return { uploadState, asyncImgHandler };
}

export function useImgFileHandlers(imgUrls: string[], asyncImgHandler: FnType) {
  const addImages = ({ target: { files } }: EventType) => {
    const bodyFormData = new FormData();
    const maxFiles = Math.min(files.length, MAX_IMAGES - imgUrls.length);

    for (let i = 0; i < maxFiles; i++) bodyFormData.append('images', files[i]);
    asyncImgHandler(imgUrls, bodyFormData, `${maxFiles} Images successfully uploaded!`);
  };

  const deleteImg = (e: EventType, id: number) => {
    e.preventDefault();
    if (!window.confirm('Do you really want to delete this image?')) return;

    /* TODO: delete image on cloudinary and update immediately to DB */
    const newImgUrls = imgUrls.filter((_, i) => i !== id);
    const bodyFormData = new FormData();
    bodyFormData.append('imgLink', imgUrls[id]);
    bodyFormData.append('image', newImgUrls.join('^'));
    asyncImgHandler(newImgUrls, bodyFormData);
  };
  return { addImages, deleteImg };
}

export function useImgLinkHandlers(product: ProductType, imgUrls: string[], setImages: SetStateType<string[]>) {
  const updateImgLink = (e: EventType, id: number) => {
    const newImgUrls = imgUrls.slice(0);
    newImgUrls[id] = e.target.value;
    setImages(newImgUrls);
  };

  const moveUpImg = (e: EventType, id: number) => {
    e.preventDefault();
    if (id < 1) return;
    const newImgUrls = imgUrls.slice(0);
    [newImgUrls[id], newImgUrls[id - 1]] = [newImgUrls[id - 1], newImgUrls[id]];
    setImages(newImgUrls);
  };

  const addImgOnEnter = (e: EventType, img: string) => e.key === 'Enter' && setImages([...imgUrls, img]);

  const getSrc = (img: string) => getImgUrl(product._id, img);

  return { updateImgLink, moveUpImg, addImgOnEnter, getSrc };
}
