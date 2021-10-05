import CustomInput from 'src/components/CustomInput';

export type ImageRowsProps = {
  images: string[];
  setPreview: SetStateType<string>;
  imgHandlers: {
    uploadStatus: StatusType;
    deleteImg: FnType;
    updateImgLink: FnType;
    moveUpImg: FnType;
    getSrc: FnType;
  };
};
export default function ImageRows({
  images,
  setPreview,
  imgHandlers: { uploadStatus, deleteImg, updateImgLink, moveUpImg, getSrc }
}: ImageRowsProps) {
  const createLabel = (id: number) => `Image ${id + 1}. ${['COVER', '[DEAL]'][id] || ''}`;

  return images?.length ? (
    <>
      {images.map((img, id) => (
        <div key={img} className="row img-row">
          <img className="small" src={getSrc(img)} alt={createLabel(id)} onMouseEnter={() => setPreview(img)} />
          <CustomInput
            text={createLabel(id)}
            wrapClass="img-row__input"
            className="row"
            value={img}
            onChange={(e: EventType) => updateImgLink(e, id)}
          />
          <button onClick={(e) => deleteImg(e, id)} disabled={uploadStatus.loading}>
            <i className="fa danger fa-close" />
          </button>
          <button disabled={uploadStatus.loading} onClick={(e) => moveUpImg(e, id)}>
            <i className="tab__w3 success fa fa-arrow-circle-up" />
          </button>
        </div>
      ))}
    </>
  ) : null;
}
