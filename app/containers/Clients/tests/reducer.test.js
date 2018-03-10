
import { fromJS } from 'immutable';
import clientsReducer from '../reducer';

describe('clientsReducer', () => {
  it('returns the initial state', () => {
    expect(clientsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
