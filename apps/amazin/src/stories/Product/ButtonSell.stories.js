import { SellerButton } from 'src/components/Product/VideoScreen/components/ButtonSell';

export default {
  title: 'Components/Screens/Product/Video Screen/Button Sell',
  component: SellerButton
};

const Template = (props) => <SellerButton {...props} />;
const args = {
  disabled: false,
  onClick: () => {}
};

export const SellerSell = Template.bind({});
SellerSell.args = { ...args };

export const Disabled = Template.bind({});
Disabled.args = { ...args, disabled: true };
