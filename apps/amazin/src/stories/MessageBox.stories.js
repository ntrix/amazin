import MessageBox from '../components/MessageBox';

export default {
  title: 'Components/Global/MessageBox',
  component: MessageBox
};

const Template = (args) => <MessageBox {...args} />;

const msg = 'Test Message Info Message Box Here';

const Args = {
  msg,
  show: true,
  variant: 'info',
  wrapClass: ''
};

export const InfoMessage = Template.bind(Args);
InfoMessage.args = { ...Args };

const ErrorMessageArgs = { ...Args, variant: 'danger' };
export const ErrorMessage = Template.bind(ErrorMessageArgs);
ErrorMessage.args = { ...ErrorMessageArgs };

const MultiMessagesArgs = { ...Args, msg: [msg, msg, msg] };
export const MultiMessages = Template.bind(MultiMessagesArgs);
MultiMessages.args = { ...MultiMessagesArgs };

const SuccessMessageArgs = { ...Args, variant: 'success' };
export const SuccessMessage = Template.bind(SuccessMessageArgs);
SuccessMessage.args = { ...SuccessMessageArgs };
