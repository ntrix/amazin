import MessageBox from '../components/MessageBox';

export default {
  title: 'Components/Message Box',
  component: MessageBox
};

const Template = (props) => (
  <div className="p-1">
    <MessageBox {...props} />
  </div>
);

const msg = 'Test Message Info Message Box Here';

const args = {
  msg,
  show: true,
  variant: 'info',
  wrapClass: ''
};

export const InfoMessage = Template.bind(args);
InfoMessage.args = { ...args };

export const ErrorMessage = Template.bind({});
ErrorMessage.args = { ...args, variant: 'danger' };

export const MultiMessages = Template.bind({});
MultiMessages.args = { ...args, msg: [msg, msg, msg] };

export const SuccessMessage = Template.bind({});
SuccessMessage.args = { ...args, variant: 'success' };
