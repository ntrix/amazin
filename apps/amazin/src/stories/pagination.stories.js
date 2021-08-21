import Pagination from '../components/Pagination';

export default {
  title: 'Components/Pagination',
  component: Pagination
};

const Template = (props) => <Pagination {...props} />;

const args = {
  page: 1,
  pages: 9,
  help: false,
  className: '',
  getUrl: () => {},
  LinkTo: (props) => <div {...props} />
};

export const Empty = Template.bind({});
Empty.args = { ...args, page: 0, pages: 1 };

export const Active = Template.bind({});
Active.args = { ...args, pages: 1 };

export const Disabled = Template.bind({});
Disabled.args = { ...args, page: 2, pages: 3, className: 'disabled' };

export const FirstPage = Template.bind({});
FirstPage.args = { ...args, page: 1 };

export const LastPage = Template.bind({});
LastPage.args = { ...args, page: args.pages };

export const WithHelp = Template.bind({});
WithHelp.args = { ...args, page: 5, help: true };
