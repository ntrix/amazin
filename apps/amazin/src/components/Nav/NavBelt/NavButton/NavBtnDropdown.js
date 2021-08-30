import { memo } from 'react';

function NavBtnDropdown({
  wrapClass = 'nav__user',
  line2Class = '',
  line2ExtClass = 'tablet--off',
  labels = '',
  children,
  disabled = false,
  ...props
}) {
  const [line1 = '', line2 = '', line2Ext = ''] = labels.split('^');
  // classes:[wrapClass,[col1, [row11, row12]],[col2, [row21, row22]]]
  return (
    <div className={`${wrapClass} ${disabled ? ' disabled dark' : ''} dropdown`} {...props}>
      <div>
        <div className="nav__line-1">{line1}</div>
        <div className={`${line2Class} nav__line-2`}>
          {line2}
          <span className={line2ExtClass}>{line2Ext}</span>
          <i className="fa fa-caret-down" />
        </div>
      </div>
      {children}
    </div>
  );
}

export default memo(NavBtnDropdown);
