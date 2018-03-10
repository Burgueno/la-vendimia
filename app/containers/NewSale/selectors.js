import { createSelector } from 'reselect';

/**
 * Direct selector to the newSale state domain
 */
const selectNewSaleDomain = () => (state) => state.get('newSale');

/**
 * Other specific selectors
 */


/**
 * Default selector used by NewSale
 */

const makeSelectNewSale = () => createSelector(
  selectNewSaleDomain(),
  (substate) => substate.toJS()
);

export default makeSelectNewSale;
export {
  selectNewSaleDomain,
};
