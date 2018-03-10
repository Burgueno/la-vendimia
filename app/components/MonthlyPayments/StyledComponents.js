import styled from 'styled-components';
import checked from 'material-ui/svg-icons/toggle/radio-button-checked';
import unChecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';

export const Styles = {
  TableRowHeader: {
    backgroundColor: '#819FF7',
  },
  TableHeaderColumn: {
    fontWeight: 600,
    fontSize: '14px',
    color: '#013ADF',
    textAlign: 'center',
  },
  LastHeader: {
    width: '96px',
  },
};

export const Container = styled.div`
  margin-top: 24px;
`;

export const Checked = styled(checked)``;

export const UnChecked = styled(unChecked)``;
