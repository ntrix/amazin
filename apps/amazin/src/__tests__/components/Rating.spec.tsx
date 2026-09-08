import React from 'react';
import { render, screen } from '@testing-library/react';
import Rating from '../../components/Rating';

function starClasses(container: HTMLElement) {
  return Array.from(container.querySelectorAll('.rating > span:first-child i')).map((el) => el.className);
}

describe('Rating', () => {
  test('renders 5 empty stars and singular "0 review" by default', () => {
    const { container } = render(<Rating />);

    expect(starClasses(container)).toEqual(['fa fa-star-o', 'fa fa-star-o', 'fa fa-star-o', 'fa fa-star-o', 'fa fa-star-o']);
    expect(screen.getByText('0 review')).toBeInTheDocument();
  });

  test('fills whole stars up to the rating and leaves the rest empty', () => {
    const { container } = render(<Rating rating={3} numReviews={25} />);

    expect(starClasses(container)).toEqual([
      'fa fa-star',
      'fa fa-star',
      'fa fa-star',
      'fa fa-star-o',
      'fa fa-star-o'
    ]);
    expect(screen.getByText('25 reviews')).toBeInTheDocument();
  });

  test('renders a half star exactly at rating + 0.5', () => {
    const { container } = render(<Rating rating={3.5} numReviews={10} />);

    expect(starClasses(container)).toEqual([
      'fa fa-star',
      'fa fa-star',
      'fa fa-star',
      'fa fa-star-half-o',
      'fa fa-star-o'
    ]);
  });

  test('uses singular "review" when numReviews is exactly 1', () => {
    render(<Rating rating={4} numReviews={1} />);
    expect(screen.getByText('1 review')).toBeInTheDocument();
  });

  test('caption overrides the review count text when provided', () => {
    render(<Rating rating={4} numReviews={12} caption="Best seller" />);
    expect(screen.getByText('Best seller')).toBeInTheDocument();
    expect(screen.queryByText('12 reviews')).not.toBeInTheDocument();
  });

  test('renders only as many stars as steps says', () => {
    const { container } = render(<Rating rating={2} steps={3} />);
    expect(starClasses(container)).toHaveLength(3);
  });
});
