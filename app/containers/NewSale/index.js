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
    const { removeProductAction, NewSale: { productos } } = this.props;
    removeProductAction(index);
    if (productos.length === 1) {
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

  handleSave = () => {
    const { resetAction } = this.props;
    resetAction();
    browserHistory.goBack();
  }

  render() {
    const {
      changeProductQuantityAction,
      setPaymentAction,
      NewSale: {
        folio,
        clientes,
        articulos,
        productos,
        configuracion: {
          tasa,
          plazoMaximo,
          porcentajeEnganche,
        },
        plazos,
        checkedValue,
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
    forEach(productos, (producto) => {
      totalAmount += producto.importe;
    });
    const deposit = (porcentajeEnganche / 100) * totalAmount;
    const bonus = deposit * ((tasa * plazoMaximo) / 100);
    const debit = totalAmount - deposit - bonus;
    const totalPrice = !!productos.length &&
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
                  map(productos, (product, index) =>
                    <TableRow key={index}>
                      <TableRowColumn>{product.descripcion}</TableRowColumn>
                      <TableRowColumn>{product.modelo}</TableRowColumn>
                      <TableRowColumn>
                        <TextField
                          name={`product-${index}`}
                          type={'number'}
                          defaultValue={product.cantidad}
                          onChange={(event, value) => changeProductQuantityAction(index, value)}
                        />
                      </TableRowColumn>
                      <TableRowColumn>{product.precio}</TableRowColumn>
                      <TableRowColumn>{product.importe}</TableRowColumn>
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
            (!!productos.length && siguiente) &&
            <MonthlyPayments
              total={debit}
              tasa={tasa}
              plazoMaximo={plazoMaximo}
              plazos={plazos}
              setPayment={setPaymentAction}
              plazoSeleccionado={checkedValue}
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
                disabled={!(cliente && !!productos.length)}
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
                  disabled={!checkedValue}
                />
          }
        </EndContainer>
      </div>
    );
  }
}

NewSale.propTypes = {
  NewSale: PropTypes.object,
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
