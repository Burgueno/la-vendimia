/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

const AppWrapper = styled.div`
  width: 100%;
  min-height: 100%;
`;

export function App(props) {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="La vendimia"
        defaultTitle="La Vendimia"
        meta={[
          { name: 'description', content: 'React.js-Apollo App' },
        ]}
      />
      {React.Children.toArray(props.children)}
    </AppWrapper>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
