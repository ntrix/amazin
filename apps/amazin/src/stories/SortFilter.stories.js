import SortFilter from '../components/SortFilter';
import { SORT } from '../constants';

export default {
  title: 'Components/Global/SortFilter',
  component: SortFilter
};

const SortOpt = Object.values(SORT);
const Template = (args) => <SortFilter {...args} />;
const Args = { order: SortOpt[0].OPT, getUrl: () => {} };

export const SortFirstOption = Template.bind(Args);
SortFirstOption.args = { ...Args };

const LastArgs = { ...Args, order: SortOpt[SortOpt.length - 1].OPT };
export const SortLastOption = Template.bind(LastArgs);
SortLastOption.args = { ...LastArgs };

const AllArgs = { ...Args, order: { options: SortOpt.map((a) => a.OPT) } };
export const SortAllOption = Template.bind(AllArgs);
SortAllOption.args = { ...AllArgs };
