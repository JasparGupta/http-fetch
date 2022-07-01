import filterParams from './filter-params';

describe('filterParams', () => {
  test('removes invalid param values', () => {
    const params = {
      a: '',
      b: 0,
      c: false,
      d: true,
      f: 'foo',
      g: null,
      h: undefined,
      i: 1,
      j: [],
    };
    const expected = {
      b: 0,
      c: false,
      d: true,
      f: 'foo',
      i: 1,
    };

    expect(Object.entries(filterParams(params))).toEqual(Object.entries(expected));
  });
});
