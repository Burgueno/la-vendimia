/**
*
* MonthlyPayments
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import {
  Checked,
  UnChecked,
  Styles,
} from './StyledComponents';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

class MonthlyPayments extends React.Component { // eslint-disable-line react/prefer-stateless-function

  setTotalPrice = (cashPrice, plazo) => {
    const { tasa } = this.props;
    const total = cashPrice * (1 + ((tasa * plazo) / 100));
    return total;
  }

  setPayment = (value, plazo) => value / plazo;

  setSaving = (value) => {
    const { total } = this.props;
    const save = total - value;
    return save;
  }

  render() {
    const {
      plazos,
      total,
      tasa,
      plazoMaximo,
      setPayment,
      plazoSeleccionado,
    } = this.props;

    const cashPrice = total / (1 + ((tasa * plazoMaximo) / 100));
    return (
      <Table
        selectable={false}
      >
        <TableHeader
          adjustForCheckbox={false}
          displaySelectAll={false}
        >
          <TableRow style={Styles.TableRowHeader}>
            <TableHeaderColumn style={Styles.TableHeaderColumn}>ABONOS MENSUALES</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
        >
          {
            map(plazos, (plazo, index) =>
              <TableRow key={index}>
                <TableRowColumn>{`${plazo} ABONOS DE`}</TableRowColumn>
                <TableRowColumn>{`$ ${this.setPayment(this.setTotalPrice(cashPrice, plazo), plazo)}`}</TableRowColumn>
                <TableRowColumn>{`TOTAL A PAGAR $ ${this.setTotalPrice(cashPrice, plazo)}`}</TableRowColumn>
                <TableRowColumn>{`SE AHORRA $ ${this.setSaving(this.setTotalPrice(cashPrice, plazo))}`}</TableRowColumn>
                <TableRowColumn style={Styles.LastHeader}>
                  <Checkbox
                    checked={plazoSeleccionado === plazo}
                    checkedIcon={<Checked />}
                    uncheckedIcon={<UnChecked />}
                    onCheck={() => setPayment(plazo)}
                  />
                </TableRowColumn>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    );
  }
}

MonthlyPayments.propTypes = {
  total: PropTypes.number,
  tasa: PropTypes.number,
  plazoMaximo: PropTypes.number,
  plazos: PropTypes.array,
  setPayment: PropTypes.func,
  plazoSeleccionado: PropTypes.number,
};

export default MonthlyPayments;
