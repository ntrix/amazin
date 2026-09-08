import React from 'react';
import { render, screen } from '@testing-library/react';
import MessageBox, { MessageLine } from '../../components/MessageBox';

describe('MessageBox', () => {
  test('renders nothing when show is false and there is no message', () => {
    const { container } = render(<MessageBox />);
    expect(container).toBeEmptyDOMElement();
  });

  test('renders a single message with the default "info" variant', () => {
    render(<MessageBox msg="Cart is empty" />);
    const item = screen.getByText('Cart is empty');
    expect(item.closest('div')).toHaveClass('alert', 'alert--info');
  });

  test('renders each entry of an array message as its own list item', () => {
    render(<MessageBox msg={['Name is required', 'Email is invalid']} variant="danger" />);
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is invalid')).toBeInTheDocument();
  });

  test('wraps the alert in wrapClass when provided', () => {
    const { container } = render(<MessageBox msg="Saved" wrapClass="my-wrap" />);
    expect(container.querySelector('.my-wrap')).not.toBeNull();
    expect(container.querySelector('.my-wrap .alert')).not.toBeNull();
  });
});

describe('MessageLine', () => {
  test('renders a success style for the checkmark message', () => {
    render(<MessageLine msg="✓" />);
    expect(screen.getByText('✓')).toHaveClass('alert', 'xs', 'alert--', 'success', 'bold', 'text-right');
  });

  test('renders a neutral style for the blank (non-breaking space) message', () => {
    const { container } = render(<MessageLine msg={'\xa0'} />);
    expect(container.firstChild).toHaveClass('alert', 'xs', 'alert--');
  });

  test('defaults to the danger style for any other message', () => {
    render(<MessageLine msg="Invalid email" />);
    expect(screen.getByText('Invalid email')).toHaveClass('alert', 'xs', 'alert--danger');
  });
});
