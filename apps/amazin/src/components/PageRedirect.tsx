import { Link } from 'react-router-dom';

export type PageRedirectProps = { label: string; to: string; children?: Children };

function PageRedirect({ label, to, children }: PageRedirectProps) {
  return (
    <div>
      <div className="mt-1">
        {label} <Link to={to}>{children}</Link>
      </div>
    </div>
  );
}

export default PageRedirect;
