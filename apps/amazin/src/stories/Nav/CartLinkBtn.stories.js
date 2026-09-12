import NavCart from '../../components/Nav/NavBelt/NavCart';

export default {
  title: 'Components/Nav/Cart Link Button',
  component: NavCart
};

const Template = (args) => <NavCart {...args} />;
const args = { to: '/cart' };

export const CartLink = Template.bind({});
CartLink.args = { ...args };
