import { ReactElement, useState } from 'react';

type Props = {
  text?: string;
  children: Children;
  rest?: RestProps;
};

function Tooltip({ text = '', children, ...rest }: Props): ReactElement {
  const [show, setShow] = useState(false);

  if (!text) return children;

  return (
    <div className="tooltip-container">
      <div className={`tooltip-box ${show ? 'visible' : ''}`}>
        {text}
        <span className="tooltip-arrow" />
      </div>
      <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} {...rest}>
        {children}
      </div>
    </div>
  );
}

export default Tooltip;
