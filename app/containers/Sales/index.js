/*
 *
 * Sales
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  map,
} from 'lodash';
import Moment from 'moment';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import makeSelectSales from './selectors';
// import messages from './messages';
import {
  Container,
  AddContainer,
  AddCircle,
  Styles,
} from './StyledComponents';

Moment.locale('es');

export class Sales extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { ventas } = this.props.Sales;
    return (
      <Container>
        <AddContainer>
          <RaisedButton
            label={'Nueva venta'}
            icon={<AddCircle />}
            backgroundColor={'#0174DF'}
            labelStyle={{
              textTransform: 'initial',
              color: '#fff',
            }}
            style={{ display: 'flex' }}
            onClick={() => browserHistory.push('/ventas/nueva-venta')}
          />
        </AddContainer>
        <Subheader
          style={{
            color: '#00BFFF',
            fontWeight: 700,
          }}
        >
          Ventas Activas
        </Subheader>
        <Table
          selectable={false}
        >
          <TableHeader
            adjustForCheckbox={false}
            displaySelectAll={false}
          >
            <TableRow style={Styles.TableRowHeader}>
              <TableHeaderColumn style={Styles.TableHeaderColumn}>Folio Venta</TableHeaderColumn>
              <TableHeaderColumn style={Styles.TableHeaderColumn}>Clave Cliente</TableHeaderColumn>
              <TableHeaderColumn style={Styles.TableHeaderColumn}>Nombre</TableHeaderColumn>
              <TableHeaderColumn style={Styles.TableHeaderColumn}>Total</TableHeaderColumn>
              <TableHeaderColumn style={Styles.TableHeaderColumn}>Fecha</TableHeaderColumn>
              <TableHeaderColumn />
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
          >
            {
              map(ventas, (venta, index) =>
                <TableRow key={index} style={Styles.TableRowHeaderB}>
                  <TableRowColumn>{venta.folio}</TableRowColumn>
                  <TableRowColumn>{venta.clave}</TableRowColumn>
                  <TableRowColumn>{venta.nombre}</TableRowColumn>
                  <TableRowColumn>{`$ ${venta.total}`}</TableRowColumn>
                  <TableRowColumn>{Moment(venta.fecha).format('L')}</TableRowColumn>
                  <TableRowColumn />
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </Container>
    );
  }
}

Sales.propTypes = {
  Sales: PropTypes.object,
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Sales: makeSelectSales(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sales);
