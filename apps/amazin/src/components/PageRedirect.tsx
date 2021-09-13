import { Link } from 'react-router-dom';

type PropType = { label: string; to: string; children?: Children };

function PageRedirect({ label, to, children }: PropType) {
  return (
    <div>
      <div className="mt-1">
        {label} <Link to={to}>{children}</Link>
      </div>
    </div>
  );
}

export default PageRedirect;
