import CustomInput from './CustomInput';

type PropType = {
  text: string;
  rest?: RestProps;
  name?: string;
  checked?: boolean;
  hook?: [AppState, SetState];
};

export default function CustomRadio({ text, ...rest }: PropType) {
  return <CustomInput wrapClass="flex" type="radio" required text={text} {...rest} />;
}
