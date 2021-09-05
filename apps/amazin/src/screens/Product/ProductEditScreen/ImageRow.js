import CustomInput from 'src/components/CustomInput';

export default function ImageRow({ id, img, setPreview, imageHandlers, deleteImg }) {
  const { uploadState, getImgLink, updateImgLink, moveUpImg } = imageHandlers;
  const label = `Image ${id + 1}. ${['COVER', '[DEAL]'][id] || ''}`;

  return (
    <div className="row img-row">
      <img alt={`Preview ${id + 1}`} className="small" src={getImgLink(img)} onMouseEnter={() => setPreview(img)} />
      <CustomInput text={label} wrapClass="img-row__input" className="row" value={img} onChange={updateImgLink(id)} />
      <button onClick={deleteImg(id)} disabled={uploadState.loading}>
        <i className="fa danger fa-close" />
      </button>
      <button disabled={uploadState.loading} onClick={moveUpImg(id)}>
        <i className="tab__w3 success fa fa-arrow-circle-up" />
      </button>
    </div>
  );
}
