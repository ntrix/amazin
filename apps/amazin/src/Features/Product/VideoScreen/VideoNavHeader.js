import React from 'react';

export function _VideoNavHeader({ labels, hook: [active, setActive] }) {
  return (
    <nav className="m-header">
      <ul className="m-nav">
        {labels.map((label, id) => (
          <li
            key={id}
            className={label === active ? ' active' : ''}
            onClick={() => setActive(label)}
          >
            {label.split(' ')[0]}
          </li>
        ))}
      </ul>
    </nav>
  );
}

const VideoNavHeader = React.memo(_VideoNavHeader);
export default VideoNavHeader;
