import CustomInput, { InputProps } from './CustomInput';

export default function CustomRadio({ text, ...rest }: InputProps) {
  return <CustomInput text={text} {...rest} wrapClass="flex" type="radio" />;
}
