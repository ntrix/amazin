import React from 'react';
import { render, screen } from '@testing-library/react';
import BaseTable from '../../layouts/BaseTable';

describe('BaseTable', () => {
  test('renders each header label upper-cased, plus a trailing ACTIONS column', () => {
    render(<BaseTable header={['name', 'price']} body={<tr><td>row</td></tr>} />);

    expect(screen.getByText('NAME')).toBeInTheDocument();
    expect(screen.getByText('PRICE')).toBeInTheDocument();
    expect(screen.getByText('ACTIONS')).toBeInTheDocument();
  });

  test('renders the given body inside the table', () => {
    render(<BaseTable header={[]} body={<tr><td>Only row</td></tr>} />);
    expect(screen.getByText('Only row')).toBeInTheDocument();
  });
});
