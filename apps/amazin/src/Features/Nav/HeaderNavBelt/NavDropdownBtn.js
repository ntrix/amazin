import React from 'react';

// classes:[wrapClass,[col1, [row11, row12]],[col2, [row21, row22]]],
export function _NavDropdownBtn({
  classes: [
    wrapClass = 'nav__user',
    line1Class = '',
    line2Class = '',
    line2ExtClass = 'tablet--off'
  ] = [],
  label: [line1 = '', line2 = '', line2Ext = ''] = [],
  children,
  disabled = false,
  ...props
}) {
  return (
    <div
      className={`dropdown ${wrapClass} ${disabled ? ' disabled dark' : ''}`}
      {...props}
    >
      <div>
        <div className={`${line1Class} nav__line-1`}>{line1}</div>
        <div className={`${line2Class} nav__line-2`}>
          {line2}
          <span className={line2ExtClass}>{line2Ext}</span>
          <i className="fa fa-caret-down"></i>
        </div>
      </div>
      {children}
    </div>
  );
}

const NavDropdownBtn = React.memo(_NavDropdownBtn);
export default NavDropdownBtn;
