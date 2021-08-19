import ButtonBuy from '../../Features/Product/VideoScreen/components/ButtonBuy';

export default {
  title: 'Components/Module/Product/Video Screen/Button Buy',
  component: ButtonBuy
};

const Template = (args) => <ButtonBuy {...args} />;
const Args = { movie: undefined, LinkTo: (props) => <div {...props} /> };

export const BuyRent = Template.bind(Args);
BuyRent.args = { ...Args };
