import { createSelector } from 'reselect';

/**
 * Direct selector to the clients state domain
 */
const selectClientsDomain = () => (state) => state.get('clients');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Clients
 */

const makeSelectClients = () => createSelector(
  selectClientsDomain(),
  (substate) => substate.toJS()
);

export default makeSelectClients;
export {
  selectClientsDomain,
};
