import { Link } from 'react-router-dom';

import { KEY } from 'src/constants';
import { Storage } from 'src/utils';

export default function BackBanner() {
  return (
    <div className="row search__banner">
      <Link to={Storage[KEY.HISTORY] || '/'} children="Back to last section" />
    </div>
  );
}
