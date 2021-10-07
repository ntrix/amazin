import { VideoType } from 'src/constants';
import { sourceAdapter } from '.';

/* create an array of 6 dummyProducts (a2 rows) for product card & screen */
export const dummyProducts = sourceAdapter(Array(6).fill(1));

/* create an array of 12 dummyMovies (a row) for videoRow(s) */
export const dummyMovies: (VideoType & ProductType)[] = sourceAdapter(Array(12).fill(1));
