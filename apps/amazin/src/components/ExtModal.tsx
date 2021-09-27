import { createPortal } from 'react-dom';
import usePortal from 'src/hooks/usePortal';

export default function ExtModal({ id, children }: { id: string; children: Children }) {
  const target = usePortal(id);
  return createPortal(children, target);
}
