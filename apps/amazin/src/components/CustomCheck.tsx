import CustomInput from './CustomInput';

type PropType = {
  text?: string;
  onChange: SetStateType<boolean | undefined>;
  rest?: RestProps;
  checked?: boolean;
};

export default function CustomCheck({ text, onChange, ...rest }: PropType) {
  return (
    <CustomInput
      wrapClass="flex"
      type="checkbox"
      text={text}
      onChange={(e: EventType) => onChange(e.target.checked)}
      {...rest}
    />
  );
}
