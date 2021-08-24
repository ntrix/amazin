import LoadingBox from '../components/LoadingBox';

export default {
  title: 'Components/Loading Box',
  component: LoadingBox
};

const Template = (props) => (
  <div className="p-1">
    <LoadingBox {...props} />
  </div>
);
const args = { xl: false, wrapClass: '' };

export const LoadingNormal = Template.bind({});
LoadingNormal.args = { ...args };

export const LoadingXL = Template.bind({});
LoadingXL.args = { ...args, xl: true };
