type PropType = {
  label?: string;
  title?: boolean;
  p1?: boolean;
  className?: string;
  children?: Children;
};

export default function Header({ label, title = false, p1 = false, className = '', children }: PropType) {
  return (
    <h1 className={`${p1 ? 'p-1 ' : ''}${title ? '' : 'mt-1 '}${className}`}>
      {label}
      {children}
    </h1>
  );
}
