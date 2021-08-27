import { SellerButton } from '../../screens/Product/VideoScreen/components/ButtonSell';
import ButtonBuy from '../../screens/Product/VideoScreen/components/ButtonBuy';
import Rating from '../../components/Rating';
import { getImgUrl } from '../../utils';
import { VIDEO } from '../../constants';

const NO_IMAGE = process.env.STORYBOOK_BASE + '/images/no-image.png';
const Template = (props) => (
  <div className="ml-1 mt-1 p-1">
    <VideoCard {...props} />
  </div>
);

function VideoCard({ movie, portrait }) {
  return (
    <div className={`m-card ${portrait ? 'm-card--portrait' : ''}`}>
      <img
        src={getImgUrl(
          movie._id,
          movie.image ? movie.image.split('^')[1 - portrait] : NO_IMAGE
        )}
        alt={movie.name}
      />
      <div className="m-card__background">
        <div className="m-card__text">
          {(movie?.description?.slice(0, 150) || 'Description ') + '..'}

          <div className="m-card__rating">
            <Rating rating={8.5} steps={10} numReviews={200} />
          </div>
        </div>

        <div className="m-card__more">
          <SellerButton />

          <ButtonBuy LinkTo={(props) => <div {...props} />} />
        </div>
      </div>

      <div className="m-card__info">
        <div className="m-card__name">{movie.name}</div>
      </div>
    </div>
  );
}

export default {
  title: 'Components/Screens/Product/Video Screen/Video Card',
  component: VideoCard
};

const args = {
  movie: VIDEO.EXAMPLES[0],
  portrait: false
};

export const Landscape = Template.bind({});
Landscape.args = { ...args };

export const Portrait = Template.bind({});
Portrait.args = { ...args, portrait: true };

export const Placeholder = Template.bind({});
Placeholder.args = { ...args, movie: {} };
