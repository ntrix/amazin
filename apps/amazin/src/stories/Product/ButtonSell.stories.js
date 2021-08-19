import { SellerButton } from '../../Features/Product/VideoScreen/components/ButtonSell';

export default {
  title: 'Components/Module/Product/Video Screen/Button Sell',
  component: SellerButton
};

const Template = (args) => <SellerButton {...args} />;
const Args = {
  disabled: false,
  onClick: () => {}
};

export const SellerSell = Template.bind(Args);
SellerSell.args = { ...Args };

const DisabledArgs = { ...Args, disabled: true };
export const Disabled = Template.bind(DisabledArgs);
Disabled.args = { ...DisabledArgs };
