import { useState } from 'react';

import { MAX_IMAGES } from 'src/constants';
import { ImageSectionProps } from 'src/screens/Product/ProductEditScreen/useImageHandlers';
import NewImageInput from 'src/components/Product/ProductEditScreen/NewImageInput';
import ImageRows from 'src/components/Product/ProductEditScreen/ImageRows';

export type Props = {
  images: string[];
  imgHandlers: ImageSectionProps;
};

export default function ImageSection({ images, imgHandlers }: Props) {
  const [preview, setPreview] = useState('');

  return (
    <>
      <div>
        <label htmlFor="image-1-cover">
          Uploaded Images ({images?.length ?? 0} of {MAX_IMAGES})<p>(or extern Image Links here)</p>
        </label>

        <ImageRows images={images} setPreview={setPreview} imgHandlers={imgHandlers} />
      </div>

      <div className="row center">
        <img alt="Preview" className="mt-1 medium" src={imgHandlers.getSrc(preview)} />
      </div>

      {images?.length < MAX_IMAGES && <NewImageInput hook={[preview, setPreview]} imgHandlers={imgHandlers} />}
    </>
  );
}
