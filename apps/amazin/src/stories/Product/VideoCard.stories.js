import { VIDEO } from '../../constants';
import ButtonBuy from '../../Features/Product/VideoScreen/components/ButtonBuy';
import { SellerButton } from '../../Features/Product/VideoScreen/components/ButtonSell';
import Rating from '../../components/Rating';
import { getImgUrl } from '../../utils';

const NO_IMAGE = 'https://amazim.store/images/no-image.png';
const Template = (args) => <VideoCard {...args} />;

function VideoCard({ movie, portrait }) {
  return (
    <div className="ml-1 mt-1 p-1">
      <div className={`m-card ${portrait ? 'm-card--portrait' : ''}`}>
        <img
          src={getImgUrl(
            movie._id,
            movie.image ? movie.image.split('^')[1] : NO_IMAGE
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
    </div>
  );
}

export default {
  title: 'Components/Module/Product/Video Screen/VideoCard',
  component: VideoCard
};

const Args = {
  movie: VIDEO.EXAMPLES[0],
  portrait: false
};

export const Landscape = Template.bind(Args);
Landscape.args = { ...Args };

const PortraitArgs = { ...Args, portrait: true };
export const Portrait = Template.bind(PortraitArgs);
Portrait.args = { ...PortraitArgs };

const PlaceholderArgs = { ...Args, movie: {} };
export const Placeholder = Template.bind(PlaceholderArgs);
Placeholder.args = { ...PlaceholderArgs };
