import SortFilter from '../components/SortFilter';
import { SORT } from '../constants';

export default {
  title: 'Components/Sort Filter',
  component: SortFilter
};

const Template = (props) => <SortFilter {...props} />;

const SortOpt = Object.values(SORT);
const args = { order: SortOpt[0].OPT, getUrl: () => {} };

export const FirstOption = Template.bind({});
FirstOption.args = { ...args };

export const LastOption = Template.bind({});
LastOption.args = { ...args, order: SortOpt[SortOpt.length - 1].OPT };
