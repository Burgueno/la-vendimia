
import { fromJS } from 'immutable';
import productsReducer from '../reducer';

describe('productsReducer', () => {
  it('returns the initial state', () => {
    expect(productsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
