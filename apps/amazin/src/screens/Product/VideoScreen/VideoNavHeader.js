import { memo } from 'react';

function VideoNavHeader({ labels, active, setActive }) {
  return (
    <nav className="m-header">
      <ul className="m-nav">
        {labels.map((label, id) => (
          <li key={id} className={label === active ? ' active' : ''} onClick={() => setActive(label)}>
            {label.split(' ')[0]}
          </li>
        ))}
      </ul>
    </nav>
  );
}
export default memo(VideoNavHeader);
