type PropType = {
  label?: string | undefined;
  title?: boolean | undefined;
  p1?: boolean | undefined;
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
