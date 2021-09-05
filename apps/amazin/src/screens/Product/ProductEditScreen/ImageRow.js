import CustomInput from 'src/components/CustomInput';

export default function ImageRow({ id, img, setPreview, imageHandlers }) {
  const { uploadState, getImgLink, updateImgLink, deleteImg, moveUpImg } = imageHandlers;

  return (
    <div className="row img-row" key={id}>
      <img alt={`Preview ${id + 1}`} className="small" src={getImgLink(img)} onMouseEnter={() => setPreview(img)} />
      <CustomInput
        text={`Image ${id + 1}. ${['COVER', '[DEAL]'][id] || ''}`}
        wrapClass="img-row__input"
        className="row"
        value={img}
        onChange={updateImgLink(id)}
      />
      <button disabled={uploadState.loading} onClick={deleteImg(id)}>
        <i className="fa danger fa-close"></i>
      </button>
      <button disabled={uploadState.loading} onClick={moveUpImg(id)}>
        <i className="fa success tab__w3 fa-arrow-circle-up"></i>
      </button>
    </div>
  );
}
