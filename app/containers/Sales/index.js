/*
 *
 * Sales
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  forEach,
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
import * as Database from '../../Database';

Moment.locale('es');

export class Sales extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      sales: [],
    };
    this.subs = [];
  }

  async componentDidMount() {
    const db = await Database.get();

    const sub = db.sales.find().$.subscribe((sales) => {
      if (!sales) return;
      this.setState({ sales });
    });
    this.subs.push(sub);
  }

  componentWillUnmount() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  setTotalPrice = (products) => {
    let total = 0;
    forEach(products, (product) => {
      total += product.amount;
    });
    return total;
  }

  render() {
    const { sales } = this.state;

    let folio = '1';
    forEach(sales, (sale) => {
      const folioAux = parseInt(sale.folio, 10) + 1;
      folio = folioAux.toString();
    });

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
            onClick={() => browserHistory.push({ pathname: '/ventas/nueva-venta', query: {}, state: { folio } })}
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
              map(sales, (venta, index) =>
                <TableRow key={index} style={Styles.TableRowHeaderB}>
                  <TableRowColumn>{venta.folio}</TableRowColumn>
                  <TableRowColumn>{venta.clientId}</TableRowColumn>
                  <TableRowColumn>{venta.clientName}</TableRowColumn>
                  <TableRowColumn>{`$ ${this.setTotalPrice(venta.products)}`}</TableRowColumn>
                  <TableRowColumn>{Moment(venta.date).format('L')}</TableRowColumn>
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
