/*
 *
 * Home
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import Moment from 'moment';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import FlatButton from 'material-ui/FlatButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import makeSelectHome from './selectors';
import {
  Container,
  Title,
  Label,
  TitleContainer,
} from './StyledComponents';

Moment.locale('es');

export class Home extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleClick = (event) => {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  handleSales = () => {
    browserHistory.push('/ventas');
    this.handleRequestClose();
  }

  handleClients = () => {
    browserHistory.push('/clientes');
    this.handleRequestClose();
  }

  handleProducts = () => {
    browserHistory.push('/articulos');
    this.handleRequestClose();
  }

  handleSettings = () => {
    browserHistory.push('/configuracion');
    this.handleRequestClose();
  }

  render() {
    const date = Moment().format('L');
    return (
      <div>
        <TitleContainer>
          <Title>
            La Vendimia
          </Title>
          <Label />
        </TitleContainer>
        <Toolbar
          style={{ backgroundColor: '#000' }}
        >
          <ToolbarGroup firstChild>
            <FlatButton
              onClick={this.handleClick}
              label={'Inicio'}
              disableTouchRipple
              labelStyle={{
                color: '#fff',
              }}
              hoverColor={'#000'}
            />
            <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
              onRequestClose={this.handleRequestClose}
            >
              <Menu>
                <MenuItem primaryText={'Ventas'} onClick={this.handleSales} />
                <Divider />
                <MenuItem primaryText={'Clientes'} onClick={this.handleClients} />
                <MenuItem primaryText={'Artículos'} onClick={this.handleProducts} />
                <MenuItem primaryText={'Configuración'} onClick={this.handleSettings} />
              </Menu>
            </Popover>
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarTitle
              text={`Fecha: ${date}`}
              style={{ color: '#fff' }}
            />
          </ToolbarGroup>
        </Toolbar>
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}

Home.propTypes = {
  children: PropTypes.node,
};

const mapStateToProps = createStructuredSelector({
  Home: makeSelectHome(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
