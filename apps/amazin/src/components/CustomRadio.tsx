import CustomInput from './CustomInput';

type PropType = {
  text: string;
  rest?: RestProps;
  name?: string;
  checked?: boolean;
  hook?: [string, SetStateType<string>];
};

export default function CustomRadio({ text, ...rest }: PropType) {
  return <CustomInput wrapClass="flex" type="radio" text={text} {...rest} />;
}
