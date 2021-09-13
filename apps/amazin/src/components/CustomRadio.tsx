import CustomInput from './CustomInput';

type PropType = {
  text: string | undefined;
  onChange: ChangeEvent;
  props: Props;
};

export default function CustomRadio({ text, onChange, ...props }: PropType) {
  return <CustomInput wrapClass="flex" type="radio" required text={text} {...props} />;
}
