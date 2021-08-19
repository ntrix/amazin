import Button from '../components/Button';

export default {
  title: 'Components/Button',
  component: Button
};

const Args = {
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
const PrimaryArgs = { ...Args, primary: true, label: 'Primary' };

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind(PrimaryArgs);
Primary.args = { ...PrimaryArgs };

export const Secondary = Template.bind(Args);
Secondary.args = { ...Args };

const SuccessArgs = { ...Args, label: 'Success', className: 'success' };
export const Success = Template.bind(SuccessArgs);
Success.args = { ...SuccessArgs };

const DangerArgs = { ...Args, label: 'Danger', className: 'danger' };
export const Danger = Template.bind(DangerArgs);
Danger.args = { ...DangerArgs };

const DisabledArgs = { ...Args, label: 'Disabled', className: 'disabled' };
export const Disabled = Template.bind(DisabledArgs);
Disabled.args = { ...DisabledArgs };

const SmallArgs = {
  ...PrimaryArgs,
  xs: true,
  label: 'Small',
  className: 'small'
};
export const Small = Template.bind(SmallArgs);
Small.args = { ...SmallArgs };
