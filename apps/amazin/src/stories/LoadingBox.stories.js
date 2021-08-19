import LoadingBox from '../components/LoadingBox';

export default {
  title: 'Components/Loading Box',
  component: LoadingBox
};

const Template = (args) => <LoadingBox {...args} />;
const Args = { xl: false, wrapClass: '' };

export const LoadingNormal = Template.bind(Args);
LoadingNormal.args = { ...Args };

const XLArgs = { ...Args, xl: true };
export const LoadingXL = Template.bind(XLArgs);
LoadingXL.args = { ...XLArgs };
