import LoadingOrError from 'src/components/LoadingOrError';
import MessageBox from 'src/components/MessageBox';
import CustomInput from 'src/components/CustomInput';

export type NewImageInputProps = {
  hook: [string, SetStateType<string>];
  imgHandlers: {
    uploadStatus: StatusType;
    addImages: FnType;
    addImgOnEnter: FnType;
  };
};

export default function NewImageInput({
  hook,
  imgHandlers: { uploadStatus, addImages, addImgOnEnter }
}: NewImageInputProps) {
  return (
    <div>
      Add
      <CustomInput text="New Images" wrapClass="flex-col" name="images" type="file" multiple onChange={addImages} />
      Or
      <CustomInput text="Image Link" wrapClass="flex-col" hook={hook} onKeyUp={addImgOnEnter} />
      <LoadingOrError statusOf={uploadStatus} />
      <MessageBox variant="info" msg={uploadStatus.msg} />
    </div>
  );
}
