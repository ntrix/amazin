import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { rootReducer } from '../src/store';

import '../src/app/app.css';
import '../src/components/Nav/nav.css';
import '../src/components/Nav/responsive.css';
import '../src/screens/Product/VideoScreen/videoScreen.css';
import '../src/screens/User/CustomerScreen/customerScreen.css';
import '../src/assets/fonts/fonts.css';
import '../src/assets/fonts/font-awesome.css';

const store = configureStore({ reducer: rootReducer, preloadedState: {}, middleware: [thunk] });

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    </Provider>
  )
];

export const parameters = {
  options: {
    storySort: {
      order: [
        'Intro',
        'Structure',
        ['Frontend', 'Public', 'Backend'],
        'Components',
        ['Nav', 'Screens', 'Button']
      ]
    }
  }
};
