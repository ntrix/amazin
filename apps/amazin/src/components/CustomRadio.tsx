import CustomInput from './CustomInput';

type PropType = {
  text: string;
  props?: Props;
  name?: string;
  checked?: boolean;
  hook?: [AppState, SetState];
};

export default function CustomRadio({ text, ...props }: PropType) {
  return <CustomInput wrapClass="flex" type="radio" required text={text} {...props} />;
}
