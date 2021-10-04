import { useState } from 'react';

import { MAX_IMAGES } from 'src/constants';
import { useAsyncUpload, useImgFileHandlers, useImgLinkHandlers } from './useImageHandlers';
import NewImageInput from 'src/components/Product/ProductEditScreen/NewImageInput';
import ImageRows from 'src/components/Product/ProductEditScreen/ImageRows';

export type ImageSectionProps = {
  product: ProductType;
  images: string[];
  setImages: SetStateType<string[]>;
};

export default function ImageSection({ product, images, setImages }: ImageSectionProps) {
  const [preview, setPreview] = useState('');
  const { uploadState, asyncImgHandler } = useAsyncUpload(product, setImages);
  const { addImages, deleteImg } = useImgFileHandlers(images, asyncImgHandler);
  const { updateImgLink, moveUpImg, addImgOnEnter, getSrc } = useImgLinkHandlers(product, images, setImages);

  const imgHandlers = { uploadState, addImages, deleteImg, updateImgLink, moveUpImg, addImgOnEnter, getSrc };

  return (
    <>
      <div>
        <label htmlFor="image-1-cover">
          Uploaded Images ({images?.length ?? 0} of {MAX_IMAGES})<p>(or extern Image Links here)</p>
        </label>

        <ImageRows images={images} setPreview={setPreview} imgHandlers={imgHandlers} />
      </div>

      <div className="row center">
        <img alt="Preview" className="mt-1 medium" src={getSrc(preview)} />
      </div>

      {images?.length < MAX_IMAGES && <NewImageInput hook={[preview, setPreview]} imgHandlers={imgHandlers} />}
    </>
  );
}
