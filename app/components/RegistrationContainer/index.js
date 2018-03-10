/**
*
* RegistrationContainer
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Title,
  SubContainer,
} from './StyledComponents';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

class RegistrationContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      children,
      title,
    } = this.props;
    return (
      <Container>
        <Title>
          {title}
        </Title>
        <SubContainer>
          {children}
        </SubContainer>
      </Container>
    );
  }
}

RegistrationContainer.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default RegistrationContainer;
