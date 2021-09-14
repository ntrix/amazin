import { useState } from 'react';

import { MAX_IMAGES } from 'src/constants';
import { useImgFileHandlers, useImgLinkHandlers } from './useImageHandlers';
import NewImageInput from './NewImageInput';
import ImageRows from '../ImageRows';

type PropType = {
  product: ProductType;
  images: string[];
  setImages: SetState;
};

export default function ImageSection({ product, images, setImages }: PropType) {
  const [preview, setPreview] = useState('');
  const { uploadState, addImgs, deleteImg } = useImgFileHandlers(product, images, setImages);
  const { updateImgLink, moveUpImg, addImgOnEnter, getSrc } = useImgLinkHandlers(product, images, setImages);

  const imgHandlers = { uploadState, addImgs, deleteImg, updateImgLink, moveUpImg, addImgOnEnter, getSrc };

  return (
    <>
      <div>
        <label htmlFor="image-1-cover">
          Uploaded Images ({images.length} of {MAX_IMAGES})<p>(or extern Image Links here)</p>
        </label>

        <ImageRows images={images} setPreview={setPreview} imgHandlers={imgHandlers} />
      </div>

      <div className="row center">
        <img alt="Preview" className="mt-1 medium" src={getSrc(preview)} />
      </div>

      {images.length < MAX_IMAGES && <NewImageInput hook={[preview, setPreview]} imgHandlers={imgHandlers} />}
    </>
  );
}