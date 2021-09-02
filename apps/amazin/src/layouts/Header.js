export default function Header({ label, title = false, p1 = false, className = '', children }) {
  return (
    <h1 className={`${p1 ? 'p-1 ' : ''}${title ? '' : 'mt-1 '}${className}`}>
      {label}
      {children}
    </h1>
  );
}
