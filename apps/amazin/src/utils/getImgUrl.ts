import { NO_IMAGE } from 'src/constants';

/* add absolute links or origin to image url or return a default */
export const getImgUrl = (product: string | ProductType, imgName: string) => {
  if (!imgName) return NO_IMAGE;

  /* !!! TODO !!! correct this on DB first, product | product._id */
  const id = String(product);
  // extern absolute Image Link? or embedded Image Link?
  return imgName.startsWith('http') || imgName.startsWith('/')
    ? imgName
    : `${process.env.REACT_APP_IMG_BASE_URL}${id}/${imgName}`;
};
