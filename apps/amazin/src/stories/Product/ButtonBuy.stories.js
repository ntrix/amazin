import ButtonBuy from 'src/components/Product/VideoScreen/components/ButtonBuy';

export default {
  title: 'Components/Screens/Product/Video Screen/Button Buy',
  component: ButtonBuy
};

const Template = (props) => <ButtonBuy {...props} />;
const args = { movie: undefined, LinkTo: (props) => <div {...props} /> };

export const BuyRent = Template.bind({});
BuyRent.args = { ...args };
