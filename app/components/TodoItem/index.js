/**
*
* TodoItem
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

function TodoItem({ titulo, descripcion, isDone, onCheck }) {
  return (
    <TableRow>
      <TableRowColumn>{titulo}</TableRowColumn>
      <TableRowColumn>{descripcion}</TableRowColumn>
      <TableRowColumn>
        <Checkbox
          checked={isDone}
          onCheck={onCheck}
        />
      </TableRowColumn>
    </TableRow>
  );
}

TodoItem.propTypes = {
  titulo: PropTypes.string,
  descripcion: PropTypes.string,
  isDone: PropTypes.bool,
  onCheck: PropTypes.func,
};

export default TodoItem;
