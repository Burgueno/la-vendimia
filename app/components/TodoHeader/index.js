/**
*
* TableHeader
*
*/

import React from 'react';
import {
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';


function TodoHeader() {
  return (
    <TableRow>
      <TableHeaderColumn>Titulo</TableHeaderColumn>
      <TableHeaderColumn>Descripcion</TableHeaderColumn>
      <TableHeaderColumn>Estado</TableHeaderColumn>
    </TableRow>
  );
}

TodoHeader.propTypes = {

};

export default TodoHeader;
