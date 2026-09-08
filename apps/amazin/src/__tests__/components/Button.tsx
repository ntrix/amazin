import React from 'react';
import { render, screen } from '@testing-library/react';
import '../../app/app.css';
import Button from '../../components/Button';

test('renders all variants of buttons', () => {
  render(<Button />);
  //screen.debug();
});
