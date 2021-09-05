import { useState } from 'react';

import { MAX_IMAGES } from 'src/constants';
import { useImgFileHandlers, useImgLinkHandlers } from './useImageHandlers';
import ImageRow from '../ImageRow';
import NewImageInput from './NewImageInput';

export default function ImageSection({ product, images, setImages }) {
  const [preview, setPreview] = useState('');
  const imgFileHandlers = useImgFileHandlers(product, images, setImages);
  const imgHandlers = { ...useImgLinkHandlers(product, images, setImages), ...imgFileHandlers };

  return (
    <>
      <div>
        <label htmlFor="image-1-cover">
          Uploaded Images ({images.length} of {MAX_IMAGES})<p>(or extern Image Links here)</p>
        </label>

        {images.map((img, id) => (
          <ImageRow id={id} img={img} setPreview={setPreview} imgHandlers={imgHandlers} />
        ))}
      </div>

      <div className="row center">
        <img alt="Preview" className="mt-1 medium" src={imgHandlers.getImgLink(preview)} />
      </div>

      {images.length < MAX_IMAGES && <NewImageInput hook={[preview, setPreview]} imgHandlers={imgHandlers} />}
    </>
  );
}
