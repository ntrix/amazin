import { memo } from 'react';

export type DropdownButtonProps = {
  wrapClass?: string;
  line2Class?: string;
  line2ExtClass?: string;
  labels?: string;
  children?: Children;
  disabled?: boolean;
  onMouseEnter?: FnType;
  onClick?: FnType;
  onMouseLeave?: FnType;
  rest?: RestProps;
};

function DropdownButton({
  wrapClass = 'nav__user',
  line2Class = '',
  line2ExtClass = 'tablet--off',
  labels = '',
  children,
  disabled = false,
  ...rest
}: DropdownButtonProps) {
  const [line1 = '', line2 = '', line2Ext = ''] = labels.split('^');
  // classes:[wrapClass,[col1, [row11, row12]],[col2, [row21, row22]]]

  return (
    <div tabIndex={2} className={`${wrapClass} ${disabled ? ' disabled dark' : ''} dropdown`} {...rest}>
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

export default memo(DropdownButton);
