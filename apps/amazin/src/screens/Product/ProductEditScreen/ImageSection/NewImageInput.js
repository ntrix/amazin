import CustomInput from 'src/components/CustomInput';

export default function NewImageInput({ hook, addImgs, addImgOnEnter }) {
  const [preview] = hook;
  return (
    <div>
      Add
      <CustomInput text="New Images" name="images" type="file" multiple onChange={addImgs} />
      Or
      <CustomInput text="Image Link" hook={hook} onKeyUp={addImgOnEnter(preview)} />
    </div>
  );
}
