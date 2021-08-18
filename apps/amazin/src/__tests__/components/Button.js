import React from 'react';
import { render, screen } from '@testing-library/react';
import '../../index.css';
import Button from '../../components/Button';

test('renders all variants of buttons', () => {
  render(<Button />);
  //screen.debug();
});
