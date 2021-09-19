export function shortName(userName?: string, length?: number): string {
  if (!userName?.length) return 'Sign In';
  if (!length) return userName;
  const name = userName.split(' ')[0];
  return name.slice(0, length) + (name.length > length ? '..' : '');
}
