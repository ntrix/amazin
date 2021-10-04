import CustomInput, { InputProps } from './CustomInput';

export type CustomCheckProps = InputProps & {
  onChange: SetStateType<boolean | undefined>;
};

export default function CustomCheck({ text, onChange, ...rest }: CustomCheckProps) {
  return (
    <CustomInput
      wrapClass="flex"
      type="checkbox"
      text={text}
      {...rest}
      onChange={(e: EventType) => onChange(e.target.checked)}
    />
  );
}
