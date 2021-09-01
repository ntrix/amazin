import CustomInput from './CustomInput';

export default function CustomCheck({ text, onChange, ...props }) {
  return (
    <CustomInput wrapClass="flex" type="checkbox" text={text} onChange={(e) => onChange(e.target.checked)} {...props} />
  );
}
