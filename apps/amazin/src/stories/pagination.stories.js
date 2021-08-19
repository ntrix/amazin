import Pagination from '../components/Pagination';

export default {
  title: 'Components/Pagination',
  component: Pagination
};

const Template = (args) => <Pagination {...args} />;

const Args = {
  page: 1,
  pages: 9,
  help: false,
  className: '',
  getUrl: () => {},
  LinkTo: (props) => <div {...props} />
};

const EmptyArgs = { ...Args, page: 0, pages: 1 };
export const Empty = Template.bind(EmptyArgs);
Empty.args = { ...EmptyArgs };

const ActiveArgs = { ...Args, pages: 1 };
export const Active = Template.bind(ActiveArgs);
Active.args = { ...ActiveArgs };

const DisabledArgs = { ...Args, page: 2, pages: 3, className: 'disabled' };
export const Disabled = Template.bind(DisabledArgs);
Disabled.args = { ...DisabledArgs };

const FirstPageArgs = { ...Args, page: 1 };
export const FirstPage = Template.bind(FirstPageArgs);
FirstPage.args = { ...Args };

const LastPageArgs = { ...Args, page: Args.pages };
export const LastPage = Template.bind(LastPageArgs);
LastPage.args = { ...LastPageArgs };

const HelpArgs = { ...Args, page: 5, help: true };
export const WithHelp = Template.bind(HelpArgs);
WithHelp.args = { ...HelpArgs };
