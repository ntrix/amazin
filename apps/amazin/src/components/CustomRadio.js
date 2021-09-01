import CustomInput from './CustomInput';

export default function CustomRadio({ text, onChange, ...props }) {
  return <CustomInput wrapClass="flex" type="radio" required text={text} {...props} />;
}
