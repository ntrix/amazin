import Rating from '../components/Rating';

export default {
  title: 'Components/Rating',
  component: Rating
};

const Template = (args) => <Rating {...args} />;

const Args = {
  rating: 0,
  numReviews: 200,
  caption: '',
  steps: 5
};

const AverageArgs = { ...Args, rating: 2.5 };
export const Average = Template.bind(AverageArgs);
Average.args = { ...AverageArgs };

const GoodArgs = { ...Args, rating: 4.5 };
export const Good = Template.bind(GoodArgs);
Good.args = { ...GoodArgs };

const BadArgs = { ...Args, rating: 0.5 };
export const Bad = Template.bind(BadArgs);
Bad.args = { ...BadArgs };

const NoReviewArgs = { ...Args, numReviews: 0 };
export const NoReview = Template.bind(NoReviewArgs);
NoReview.args = { ...NoReviewArgs };

const Rating10StepsArgs = { ...Args, rating: 9.5, steps: 10 };
export const Rating10Steps = Template.bind(Rating10StepsArgs);
Rating10Steps.args = { ...Rating10StepsArgs };

const WithCaptionArgs = { ...Args, caption: ' Stars & Up' };
export const WithCaption = Template.bind(WithCaptionArgs);
WithCaption.args = { ...WithCaptionArgs };
