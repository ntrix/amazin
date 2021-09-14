import LoadingOrError from 'src/components/LoadingOrError';
import MessageBox from 'src/components/MessageBox';
import CustomInput from 'src/components/CustomInput';

type PropType = {
  hook: [string, SetState];
  imgHandlers: {
    uploadState: StatusType;
    addImgs: FnType;
    addImgOnEnter: FnType;
  };
};

export default function NewImageInput({ hook, imgHandlers: { uploadState, addImgs, addImgOnEnter } }: PropType) {
  return (
    <div>
      Add
      <CustomInput text="New Images" name="images" type="file" multiple onChange={addImgs} />
      Or
      <CustomInput text="Image Link" hook={hook} onKeyUp={addImgOnEnter} />
      <LoadingOrError statusOf={uploadState} />
      <MessageBox variant="info" msg={uploadState.msg} />
    </div>
  );
}
