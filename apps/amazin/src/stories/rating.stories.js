import Rating from '../components/Rating';

export default {
  title: 'Components/Rating',
  component: Rating
};

const Template = (props) => <Rating {...props} />;

const args = {
  rating: 0,
  numReviews: 200,
  caption: '',
  steps: 5
};

export const Average = Template.bind({});
Average.args = { ...args, rating: 2.5 };

export const Good = Template.bind({});
Good.args = { ...args, rating: 4.5 };

export const Bad = Template.bind({});
Bad.args = { ...args, rating: 0.5 };

export const NoReview = Template.bind({});
NoReview.args = { ...args, numReviews: 0 };

export const Rating10Steps = Template.bind({});
Rating10Steps.args = { ...args, rating: 9.5, steps: 10 };

export const WithCaption = Template.bind({});
WithCaption.args = { ...args, caption: ' Stars & Up' };
