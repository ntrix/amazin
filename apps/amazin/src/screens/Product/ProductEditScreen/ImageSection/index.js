import { useState } from 'react';

import { MAX_IMAGES } from 'src/constants';
import { useUploadImages, useAsyncUpload, useImageHandlers, useImageDelete } from './useImageHandlers';
import ImageRow from '../ImageRow';
import NewImageInput from './NewImageInput';
import LoadingOrError from 'src/components/LoadingOrError';
import MessageBox from 'src/components/MessageBox';

export default function ImageSection({ product, images, setImages }) {
  const [preview, setPreview] = useState('');
  const { uploadState, asyncUploadImgs } = useAsyncUpload(setImages);
  const { addImgs, addImgOnEnter } = useUploadImages(product, images, setImages, asyncUploadImgs);
  const imageHandlers = { ...useImageHandlers(product, images, setImages, asyncUploadImgs), uploadState };
  const { deleteImg } = useImageDelete(product, images, asyncUploadImgs);

  return (
    <>
      <div>
        <label htmlFor="image-1-cover">
          Uploaded Images ({images.length} of {MAX_IMAGES})<p>(or extern Image Links here)</p>
        </label>

        {images.map((img, id) => (
          <ImageRow
            key={id}
            id={id}
            img={img}
            setPreview={setPreview}
            imageHandlers={imageHandlers}
            deleteImg={deleteImg}
          />
        ))}
      </div>

      <div className="row center">
        <img alt="Preview" className="mt-1 medium" src={imageHandlers.getImgLink(preview)} />
        <LoadingOrError statusOf={uploadState} />
        <MessageBox variant="info" msg={uploadState.msg} />
      </div>

      {images.length < MAX_IMAGES && (
        <NewImageInput hook={[preview, setPreview]} addImgs={addImgs} addImgOnEnter={addImgOnEnter} />
      )}
    </>
  );
}
