import CartLinkBtn from '../../components/Nav/NavBelt/CartLinkBtn';

export default {
  title: 'Components/Nav/Cart Link Button',
  component: CartLinkBtn
};

const Template = (args) => <CartLinkBtn {...args} />;
const Args = { counter: 0, LinkTo: (props) => <div {...props} /> };

export const CartEmpty = Template.bind(Args);
CartEmpty.args = { ...Args };

const CartMaxArgs = { ...Args, counter: 99 };
export const CartMax = Template.bind(CartMaxArgs);
CartMax.args = { ...CartMaxArgs };
