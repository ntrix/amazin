import CustomInput from '../components/CustomInput';

export default {
  title: 'Components/Form Custom Input',
  component: CustomInput
};

const Template = (props) => (
  <div className="p-1">
    <form className="form">
      <CustomInput {...props} />
    </form>
  </div>
);

const text = 'Sample Text Input';
const args = {
  text,
  type: 'text',
  placeholder: `Enter ${text}`,
  hook: {},
  textarea: false,
  label: text,
  wrapClass: 'flex-col',
  rest: null
};

export const SameLabel = Template.bind({});
SameLabel.args = { ...args };

export const OptionalLabel = Template.bind({});
OptionalLabel.args = { ...args, label: 'Set Or Remove Label' };

export const Inline = Template.bind({});
Inline.args = { ...args, wrapClass: '' };

export const TextArea = Template.bind({});
TextArea.args = { ...args, textarea: true };
