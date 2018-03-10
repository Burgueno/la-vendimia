/**
*
* TodoTable
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from 'components/TodoItem';
import TodoHeader from 'components/TodoHeader';
import {
  Table,
  TableBody,
  TableHeader,
} from 'material-ui/Table';

class TodoTable extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  handleOnCheckItem = (index) => {
    const { onCheckItem } = this.props;
    onCheckItem(index);
  }
  render() {
    const { todos } = this.props;
    const items = todos.map(({ titulo, descripcion, isDone }, index) => (
      <TodoItem
        key={index}
        onCheck={() => this.handleOnCheckItem(index)}
        titulo={titulo}
        descripcion={descripcion}
        isDone={isDone}
      />
    ));
    return (
      <Table
        selectable={false}
        multiSelectable={false}
      >
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TodoHeader />
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {items}
        </TableBody>
      </Table>
    );
  }
}

TodoTable.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  onCheckItem: PropTypes.func,
};

TodoTable.propTypes = {
  onCheckItem: () => {},
  todos: [],
};

export default TodoTable;
