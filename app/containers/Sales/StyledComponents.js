import styled from 'styled-components';
import add from 'material-ui/svg-icons/content/add-circle';

export const Styles = {
  TableRowHeader: {
    backgroundColor: '#819FF7',
  },
  TableHeaderColumn: {
    fontWeight: 600,
    fontSize: '14px',
    color: '#013ADF',
  },
  TableRowHeaderB: {
    backgroundColor: '#A9BCF5',
  },
  TableHeaderColumnB: {
    fontWeight: 600,
    fontSize: '14px',
    color: '#013ADF',
  },
};

export const Container = styled.div`
  margin-top: 24px;
`;

export const AddContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

export const AddCircle = styled(add)`
  fill: #04B431 !important;
`;
