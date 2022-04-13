/**
 * @jest-environment jsdom
 */
import 'isomorphic-fetch';
import 'whatwg-fetch';

import { putComment, getComments, fetchTotalPokemons } from '../modules/involvement.js';

localStorage.setItem('myApp', 'yF5zxJtwKDf1L72mEvjU');
describe('comments count', () => {
  test('comments count', async () => {
    const id = 1;
    await getComments(id).then(async (arr) => {
      await putComment(id, 'Monika', 'adf');
      await getComments(id).then(async (arr2) => {
        expect(arr2.length).toEqual(arr.length + 1);
      });
    });
  });
});

describe('total items count', () => {
  test('total items count', async () => {
    const total = 1126;
    await fetchTotalPokemons().then((totalPokemons) => {
      expect(totalPokemons).toEqual(total);
    });
  });
});