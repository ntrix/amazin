import { getImgUrl } from '../../utils/getImgUrl';

describe('getImgUrl', () => {
  test('returns the default no-image path when imgName is empty', () => {
    expect(getImgUrl('p1', '')).toBe('/images/no-image.png');
  });

  test('returns an absolute http(s) url unchanged', () => {
    expect(getImgUrl('p1', 'https://cdn.example.com/pic.jpg')).toBe('https://cdn.example.com/pic.jpg');
  });

  test('returns a root-relative path unchanged', () => {
    expect(getImgUrl('p1', '/local/pic.jpg')).toBe('/local/pic.jpg');
  });

  test('builds an image-base-url path for a bare filename', () => {
    const result = getImgUrl('p1', 'pic.jpg');
    expect(result).toBe(`${process.env.REACT_APP_IMG_BASE_URL}p1/pic.jpg`);
  });
});
