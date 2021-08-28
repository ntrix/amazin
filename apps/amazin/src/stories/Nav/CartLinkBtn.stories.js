import NavCart from '../../components/Nav/NavBelt/NavCart';

export default {
  title: 'Components/Nav/Cart Link Button',
  component: NavCart
};

const Template = (args) => <NavCart {...args} />;
const Args = { counter: 0, LinkTo: (props) => <div {...props} /> };

export const CartEmpty = Template.bind(Args);
CartEmpty.args = { ...Args };

const CartMaxArgs = { ...Args, counter: 99 };
export const CartMax = Template.bind(CartMaxArgs);
CartMax.args = { ...CartMaxArgs };
