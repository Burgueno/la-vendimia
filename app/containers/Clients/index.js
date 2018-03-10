/*
 *
 * Clients
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectClients from './selectors';
import messages from './messages';

export class Clients extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="Clients"
          meta={[
            { name: 'description', content: 'Description of Clients' },
          ]}
        />
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

Clients.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Clients: makeSelectClients(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Clients);
