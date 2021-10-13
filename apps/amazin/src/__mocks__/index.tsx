import { Provider } from 'react-redux';
import mockStore from './store';

export function AppProviders({ children }: { children: Children }) {
  return <Provider store={mockStore}>{children}</Provider>;
}
