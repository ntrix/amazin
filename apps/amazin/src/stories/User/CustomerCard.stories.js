import { customerMenuTemplate } from '../../screens/User/CustomerScreen/customerMenuTemplate';
import CustomerCard, {
  mapCustomerCardProp
} from '../../screens/User/CustomerScreen/CustomerCard';

export default {
  title: 'Components/Features/User/Customer Card',
  component: CustomerCard
};

const Template = (props) => (
  <div className="c-screen customer p-1">
    <div className="container">
      <div className="c-boxes mt-1">
        <CustomerCard {...props} />
      </div>
    </div>
  </div>
);

const customerCards = customerMenuTemplate.map((p) => ({
  ...mapCustomerCardProp(p),
  baseUrl: process.env.STORYBOOK_BASE
}));

export const Card0 = Template.bind({});
Card0.args = { ...customerCards[0] };
export const Card1 = Template.bind({});
Card1.args = { ...customerCards[1] };
export const Card2 = Template.bind({});
Card2.args = { ...customerCards[2] };
export const Card3 = Template.bind({});
Card3.args = { ...customerCards[3] };
export const Card4 = Template.bind({});
Card4.args = { ...customerCards[4] };
export const Card5 = Template.bind({});
Card5.args = { ...customerCards[5] };
export const Card6 = Template.bind({});
Card6.args = { ...customerCards[6] };
export const Card7 = Template.bind({});
Card7.args = { ...customerCards[7] };
export const Card8 = Template.bind({});
Card8.args = { ...customerCards[8] };
export const Card9 = Template.bind({});
Card9.args = { ...customerCards[9] };

const TemplateAll = ({ cards }) => (
  <div className="c-screen customer p-1">
    <div className="container">
      <div className="c-boxes">
        {cards.map((props) => (
          <CustomerCard {...props} />
        ))}
      </div>
    </div>
  </div>
);
export const AllCards = TemplateAll.bind({});
AllCards.args = { cards: customerCards };
