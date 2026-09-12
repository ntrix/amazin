import { SellerButton } from '../../components/Product/VideoScreen/components/ButtonSell';

export default {
  title: 'Components/Screens/Product/Video Screen/Button Sell',
  component: SellerButton
};

const Template = (props) => <SellerButton {...props} />;
const args = {
  disabled: false,
  onClick: () => undefined
};

export const SellerSell = Template.bind({});
SellerSell.args = { ...args };

export const Disabled = Template.bind({});
Disabled.args = { ...args, disabled: true };
