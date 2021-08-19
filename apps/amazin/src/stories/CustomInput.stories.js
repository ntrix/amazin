import CustomInput from '../components/CustomInput';

export default {
  title: 'Components/Custom Input',
  component: CustomInput
};

const Template = (args) => <CustomInput {...args} />;
const text = 'Sample Text Input';
const Args = {
  text,
  type: 'text',
  placeholder: `Enter ${text}`,
  hook: {},
  textarea: false,
  label: text,
  wrapClass: 'flex-col',
  rest: null
};

export const SameLabel = Template.bind(Args);
SameLabel.args = { ...Args };

const OptionalLabelArgs = { ...Args, label: 'Set Or Remove Label' };
export const OptionalLabel = Template.bind(OptionalLabelArgs);
OptionalLabel.args = { ...OptionalLabelArgs };

const InlineArgs = { ...Args, wrapClass: '' };
export const Inline = Template.bind(InlineArgs);
Inline.args = { ...InlineArgs };

const TextAreaArgs = { ...Args, textarea: true };
export const TextArea = Template.bind(TextAreaArgs);
TextArea.args = { ...TextAreaArgs };
