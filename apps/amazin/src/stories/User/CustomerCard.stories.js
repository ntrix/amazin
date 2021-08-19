import { customerMenuTemplate } from '../../Features/User/CustomerScreen/customerMenuTemplate';
import CustomerCard, {
  mapCustomerCardProp
} from '../../Features/User/CustomerScreen/CustomerCard';

const baseUrl = 'https://amazim.store';

export default {
  title: 'Components/Features/User/Customer Card',
  component: CustomerCard
};

const Template = (args) => <CustomerCard {...args} />;

const customerCards = customerMenuTemplate.map((p) => ({
  ...mapCustomerCardProp(p),
  baseUrl
}));

export const Card0 = Template.bind(customerCards[0]);
Card0.args = { ...customerCards[0] };
export const Card1 = Template.bind(customerCards[1]);
Card1.args = { ...customerCards[1] };
export const Card2 = Template.bind(customerCards[2]);
Card2.args = { ...customerCards[2] };
export const Card3 = Template.bind(customerCards[3]);
Card3.args = { ...customerCards[3] };
export const Card4 = Template.bind(customerCards[4]);
Card4.args = { ...customerCards[4] };
export const Card5 = Template.bind(customerCards[5]);
Card5.args = { ...customerCards[5] };
export const Card6 = Template.bind(customerCards[6]);
Card6.args = { ...customerCards[6] };
export const Card7 = Template.bind(customerCards[7]);
Card7.args = { ...customerCards[7] };
export const Card8 = Template.bind(customerCards[8]);
Card8.args = { ...customerCards[8] };
export const Card9 = Template.bind(customerCards[9]);
Card9.args = { ...customerCards[9] };
