import React from 'react';
import { Link } from 'react-router-dom';

import { useShadow } from '../../../utils/useShadow';

const _InnerMenuItem = (props) => {
  const { clearShadow } = useShadow('');
  const { className, label, linkTo, extraAction } = props;

  if (!linkTo && !className) return <strong>{label}</strong>;

  if (linkTo === 'disabled')
    return (
      <Link to="#" className="disabled">
        {label}
      </Link>
    );

  if (linkTo.startsWith('https://'))
    //a href instead of Link for extern links
    return (
      <a href={linkTo} target="_blank" rel="noreferrer">
        {label}
      </a>
    );

  if (linkTo)
    return (
      <Link
        to={linkTo}
        className={className}
        onClick={(e) => {
          e.stopPropagation();
          clearShadow();
          if (extraAction) extraAction();
        }}
      >
        {label}
      </Link>
    );

  return <div>{label}</div>;
};

const InnerMenuItem = React.memo(_InnerMenuItem);

const MenuItem = ([label, linkTo, className, extraAction], id) => {
  return label === 'separator' ? (
    <div key={id} className="separator"></div>
  ) : (
    <li key={id}>
      <InnerMenuItem
        className={className}
        label={label}
        linkTo={linkTo}
        extraAction={extraAction}
      />
    </li>
  );
};

export default MenuItem;
