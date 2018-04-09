/*
 *
 * NewSale
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RegistrationContainer from 'components/RegistrationContainer';
import MonthlyPayments from 'components/MonthlyPayments';
import { createStructuredSelector } from 'reselect';
import {
  forEach,
  find,
  map,
} from 'lodash';
import { browserHistory } from 'react-router';
import AutoComplete from 'material-ui/AutoComplete';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import makeSelectNewSale from './selectors';
import {
  EndContainer,
  Folio,
  SearcherContainer,
  SearchTitle,
  RFC,
  AddBox,
  DeleteItem,
  SubContainer,
  PricesContainer,
  PriceTitle,
  Value,
  Styles,
} from './StyledComponents';
import * as NewSaleActions from './actions';
import * as Database from '../../Database';
// import messages from './messages';

export class NewSale extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    cliente: '',
    articulo: '',
    siguiente: false,
  }

  setTotalPrice = (price) => {
    const { tasa, plazoMaximo } = this.props.NewSale.configuracion;
    const total = price * (1 + ((tasa * plazoMaximo) / 100));
    return total;
  }

  handleUpdateClientes = (searchText) => {
    this.setState({ cliente: searchText });
  };

  handleUpdateArticulos = (searchText) => {
    this.setState({ articulo: searchText });
  };

  handleNewArticle = () => {
    const { addProductAction, NewSale: { articulos } } = this.props;
    const { articulo } = this.state;

    if (find(articulos, { descripcion: articulo })) {
      const article = find(articulos, { descripcion: articulo });
      const total = this.setTotalPrice(article.precio);
      addProductAction(article.descripcion, article.modelo, total);
      this.setState({ articulo: '' });
    }
  }

  handleDeleteArticle = (index) => {
    const { removeProductAction, NewSale: { products } } = this.props;
    removeProductAction(index);
    if (products.length === 1) {
      this.setState({ siguiente: false });
    }
  }

  handleCancel = () => {
    const { resetAction } = this.props;
    resetAction();
    browserHistory.goBack();
  }

  handleNextStep = () => {
    this.setState({ siguiente: true });
  };

  handleSave = async () => {
    const {
      resetAction,
      NewSale: {
        clientes,
        products,
        period,
      },
      location: {
        state: {
          folio,
        },
      },
    } = this.props;
    const {
      cliente,
    } = this.state;
    const clientFlag = !!find(clientes, { nombre: cliente });
    const clientId = clientFlag && find(clientes, { nombre: cliente }).clientId;
    const date = Date();
    const db = await Database.get();
    db.sales.insert({ folio, clientId, clientName: cliente, date, products, period });
    await resetAction();
    browserHistory.goBack();
  }

  render() {
    const {
      changeProductQuantityAction,
      setPaymentAction,
      NewSale: {
        clientes,
        articulos,
        products,
        configuracion: {
          tasa,
          plazoMaximo,
          porcentajeEnganche,
        },
        plazos,
        period,
      },
      location: {
        state: {
          folio,
        },
      },
    } = this.props;

    const {
      cliente,
      articulo,
      siguiente,
    } = this.state;

    const clientFlag = !!find(clientes, { nombre: cliente });
    const clientRFC = clientFlag && find(clientes, { nombre: cliente }).rfc;

    const clients = [];
    const articles = [];
    forEach(clientes, (client) => {
      clients.push(client.nombre);
    });
    forEach(articulos, (article) => {
      articles.push(article.descripcion);
    });

    let totalAmount = 0;
    forEach(products, (producto) => {
      totalAmount += producto.amount;
    });
    const deposit = (porcentajeEnganche / 100) * totalAmount;
    const bonus = deposit * ((tasa * plazoMaximo) / 100);
    const debit = totalAmount - deposit - bonus;
    const totalPrice = !!products.length &&
      <SubContainer>
        <PricesContainer>
          <PriceTitle>Enganche:</PriceTitle>
          <Value>{deposit}</Value>
        </PricesContainer>
        <PricesContainer>
          <PriceTitle>Bonificación Enganche:</PriceTitle>
          <Value>{bonus}</Value>
        </PricesContainer>
        <PricesContainer>
          <PriceTitle>Total:</PriceTitle>
          <Value>{debit}</Value>
        </PricesContainer>
      </SubContainer>;

    return (
      <div>
        <RegistrationContainer
          title={'Registro de Ventas'}
        >
          <EndContainer>
            <Folio>
              Folio Venta: {folio}
            </Folio>
          </EndContainer>
          <div>
            <SearcherContainer>
              <SearchTitle>Cliente: </SearchTitle>
              <AutoComplete
                hintText={'Buscar Clientes...'}
                dataSource={clients}
                style={{ margin: '0 16px' }}
                onUpdateInput={this.handleUpdateClientes}
              />
              {
                !!clientRFC &&
                <RFC>
                  RFC: {clientRFC}
                </RFC>
              }
            </SearcherContainer>
            <SearcherContainer>
              <SearchTitle>Articulo: </SearchTitle>
              <AutoComplete
                hintText={'Buscar Articulos...'}
                dataSource={articles}
                style={{ margin: '0 16px' }}
                onUpdateInput={this.handleUpdateArticulos}
                searchText={articulo}
              />
              <IconButton onClick={this.handleNewArticle}>
                <AddBox />
              </IconButton>
            </SearcherContainer>
          </div>

          <SubContainer>
            <Table
              selectable={false}
            >
              <TableHeader
                adjustForCheckbox={false}
                displaySelectAll={false}
              >
                <TableRow style={Styles.TableRowHeader}>
                  <TableHeaderColumn style={Styles.TableHeaderColumn}>Descripcion Artículo</TableHeaderColumn>
                  <TableHeaderColumn style={Styles.TableHeaderColumn}>Modelo</TableHeaderColumn>
                  <TableHeaderColumn style={Styles.TableHeaderColumn}>Cantidad</TableHeaderColumn>
                  <TableHeaderColumn style={Styles.TableHeaderColumn}>Precio</TableHeaderColumn>
                  <TableHeaderColumn style={Styles.TableHeaderColumn}>Importe</TableHeaderColumn>
                  <TableHeaderColumn style={Styles.LastHeader} />
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
              >
                {
                  map(products, (product, index) =>
                    <TableRow key={index}>
                      <TableRowColumn>{product.description}</TableRowColumn>
                      <TableRowColumn>{product.model}</TableRowColumn>
                      <TableRowColumn>
                        <TextField
                          name={`product-${index}`}
                          type={'number'}
                          defaultValue={product.quantity}
                          onChange={(event, value) => changeProductQuantityAction(index, value)}
                        />
                      </TableRowColumn>
                      <TableRowColumn>{product.price}</TableRowColumn>
                      <TableRowColumn>{product.amount}</TableRowColumn>
                      <TableRowColumn style={Styles.LastHeader}>
                        <IconButton onClick={() => this.handleDeleteArticle(index)}>
                          <DeleteItem />
                        </IconButton>
                      </TableRowColumn>
                    </TableRow>
                  )
                }
              </TableBody>
            </Table>
          </SubContainer>
          {totalPrice}
          {
            (!!products.length && siguiente) &&
            <MonthlyPayments
              total={debit}
              tasa={tasa}
              plazoMaximo={plazoMaximo}
              plazos={plazos}
              setPayment={setPaymentAction}
              plazoSeleccionado={period}
            />
          }
        </RegistrationContainer>
        <EndContainer>
          <RaisedButton
            label={'Cancelar'}
            backgroundColor={'#04B431'}
            style={{ display: 'flex', marginLeft: '24px' }}
            labelStyle={{
              textTransform: 'initial',
              color: '#fff',
            }}
            onClick={() => this.handleCancel()}
          />
          {
            !siguiente ?
              <RaisedButton
                label={'Siguiente'}
                backgroundColor={'#04B431'}
                style={{ display: 'flex', marginLeft: '24px' }}
                labelStyle={{
                  textTransform: 'initial',
                  color: '#fff',
                }}
                onClick={() => this.handleNextStep()}
                disabled={!(cliente && !!products.length)}
              /> :
                <RaisedButton
                  label={'Guardar'}
                  backgroundColor={'#04B431'}
                  style={{ display: 'flex', marginLeft: '24px' }}
                  labelStyle={{
                    textTransform: 'initial',
                    color: '#fff',
                  }}
                  onClick={() => this.handleSave()}
                  disabled={!period}
                />
          }
        </EndContainer>
      </div>
    );
  }
}

NewSale.propTypes = {
  NewSale: PropTypes.object,
  location: PropTypes.object,
  addProductAction: PropTypes.func,
  removeProductAction: PropTypes.func,
  changeProductQuantityAction: PropTypes.func,
  setPaymentAction: PropTypes.func,
  resetAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  NewSale: makeSelectNewSale(),
});

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators(NewSaleActions, dispatch);
  return {
    dispatch,
    ...actions,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewSale);
