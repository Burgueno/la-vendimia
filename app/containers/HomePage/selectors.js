/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('Home');

const makeSelectHome = () => createSelector(
  selectHome,

);

export {
  makeSelectHome,
};
