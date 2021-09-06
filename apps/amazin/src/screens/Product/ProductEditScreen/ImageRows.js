import CustomInput from 'src/components/CustomInput';

export default function ImageRows({ images, setPreview, imgHandlers }) {
  const { uploadState, getSrc, updateImgLink, deleteImg, moveUpImg } = imgHandlers;
  const createLabel = (id) => `Image ${id + 1}. ${['COVER', '[DEAL]'][id] || ''}`;

  if (!images || !images.length) return null;

  return images.map((img, id) => (
    <div key={id} className="row img-row">
      <img className="small" src={getSrc(img)} alt={createLabel(id)} onMouseEnter={() => setPreview(img)} />
      <CustomInput
        text={createLabel(id)}
        wrapClass="img-row__input"
        className="row"
        value={img}
        onChange={updateImgLink(id)}
      />
      <button onClick={deleteImg(id)} disabled={uploadState.loading}>
        <i className="fa danger fa-close" />
      </button>
      <button disabled={uploadState.loading} onClick={moveUpImg(id)}>
        <i className="tab__w3 success fa fa-arrow-circle-up" />
      </button>
    </div>
  ));
}
