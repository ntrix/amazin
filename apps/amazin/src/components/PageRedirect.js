import { Link } from 'react-router-dom';

function PageRedirect({ label, to, children }) {
  return (
    <div>
      <div className="mt-1">
        {label} <Link to={to}>{children}</Link>
      </div>
    </div>
  );
}

export default PageRedirect;
