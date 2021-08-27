import '../src/index.css';
import '../src/components/Nav/nav.css';
import '../src/screens/Product/VideoScreen/videoScreen.css';
import '../src/screens/User/CustomerScreen/customerScreen.css';
import '../src/app/responsive.css';
import '../src/fonts/fonts.css';
import '../src/fonts/font-awesome.css';

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
