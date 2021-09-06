import CustomInput from 'src/components/CustomInput';

export default function ImageRows({
  images,
  setPreview,
  imgHandlers: { uploadState, deleteImg, updateImgLink, moveUpImg, getSrc }
}) {
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
        onChange={(e) => updateImgLink(e, id)}
      />
      <button onClick={(e) => deleteImg(e, id)} disabled={uploadState.loading}>
        <i className="fa danger fa-close" />
      </button>
      <button disabled={uploadState.loading} onClick={(e) => moveUpImg(e, id)}>
        <i className="tab__w3 success fa fa-arrow-circle-up" />
      </button>
    </div>
  ));
}
