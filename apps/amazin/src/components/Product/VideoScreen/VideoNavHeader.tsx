import { memo } from 'react';

import { GenreType } from 'src/constants';

export type VideoNavHeaderProps = {
  genreLabels: GenreType[];
  active: GenreType;
  setActive: SetStateType<GenreType>;
};

function VideoNavHeader({ genreLabels, active, setActive }: VideoNavHeaderProps) {
  return (
    <nav className="m-header">
      <ul className="m-nav">
        {genreLabels.map((label) => (
          <li key={label} className={label === active ? ' active' : ''} onClick={() => setActive(label)}>
            {label.split(' ')[0]}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default memo(VideoNavHeader);
