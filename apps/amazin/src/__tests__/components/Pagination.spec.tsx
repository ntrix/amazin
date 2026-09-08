import React from 'react';
import { render, screen } from '@testing-library/react';
import Pagination from '../../components/Pagination';

const stubLinkTo = ({ to, className, children }: { to: string; className?: string; children?: React.ReactNode }) => (
  <a href={to} className={className}>
    {children}
  </a>
);

describe('Pagination', () => {
  test('renders one link per page, using getUrl for each href', () => {
    const getUrl = jest.fn(({ page }: { page: number }) => `/search/page/${page}`);
    render(<Pagination getUrl={getUrl} page={1} pages={3} LinkTo={stubLinkTo} />);

    expect(screen.getByRole('link', { name: '1' })).toHaveAttribute('href', '/search/page/1');
    expect(screen.getByRole('link', { name: '2' })).toHaveAttribute('href', '/search/page/2');
    expect(screen.getByRole('link', { name: '3' })).toHaveAttribute('href', '/search/page/3');
  });

  test('marks only the current page as active', () => {
    const getUrl = jest.fn(({ page }: { page: number }) => `/page/${page}`);
    render(<Pagination getUrl={getUrl} page={2} pages={3} LinkTo={stubLinkTo} />);

    expect(screen.getByRole('link', { name: '1' })).not.toHaveClass('active');
    expect(screen.getByRole('link', { name: '2' })).toHaveClass('active');
    expect(screen.getByRole('link', { name: '3' })).not.toHaveClass('active');
  });

  test('renders no page links when pages is not provided', () => {
    const getUrl = jest.fn();
    render(<Pagination getUrl={getUrl} LinkTo={stubLinkTo} />);

    expect(screen.queryAllByRole('link')).toHaveLength(0);
  });

  test('shows the help block only when help is true', () => {
    const getUrl = jest.fn(() => '/x');
    const { rerender } = render(<Pagination getUrl={getUrl} pages={1} LinkTo={stubLinkTo} />);
    expect(screen.queryByText(/need help/i)).not.toBeInTheDocument();

    rerender(<Pagination getUrl={getUrl} pages={1} help LinkTo={stubLinkTo} />);
    expect(screen.getByText(/need help/i)).toBeInTheDocument();
  });
});
