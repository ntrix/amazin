import Button from '../components/Button';

export default {
  title: 'Components/Button',
  component: Button
};

const Template = (props) => (
  <div className="p-1">
    <Button {...props} />
  </div>
);

const args = {
  label: 'Secondary',
  wrapClass: '',
  ariaLabel: '',
  primary: false,
  xs: false,
  className: '',
  onFocus: () => {},
  onClick: () => {},
  to: undefined
};

export const Primary = Template.bind({});
Primary.args = { ...args, primary: true, label: 'Primary' };

export const Secondary = Template.bind({});
Secondary.args = { ...args };

export const Success = Template.bind({});
Success.args = { ...args, label: 'Success', className: 'success' };

export const Danger = Template.bind({});
Danger.args = { ...args, label: 'Danger', className: 'danger' };

export const Disabled = Template.bind({});
Disabled.args = { ...args, label: 'Disabled', className: 'disabled' };

export const Small = Template.bind({});
Small.args = {
  ...args,
  xs: true,
  label: 'Small',
  className: 'small'
};
