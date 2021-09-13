import CustomInput from './CustomInput';

type PropType = {
  text: string | undefined;
  onChange: ChangeEvent;
  props: Props;
};

export default function CustomCheck({ text, onChange, ...props }: PropType) {
  return (
    <CustomInput
      wrapClass="flex"
      type="checkbox"
      text={text}
      onChange={(e: EventType) => onChange(e.target.checked)}
      {...props}
    />
  );
}
