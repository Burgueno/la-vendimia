import styled from 'styled-components';
import add from 'material-ui/svg-icons/content/add-box';
import clear from 'material-ui/svg-icons/content/clear';

export const Styles = {
  TableRowHeader: {
    backgroundColor: '#E6E6E6',
  },
  TableHeaderColumn: {
    fontWeight: 600,
    fontSize: '14px',
    color: '#2E2E2E',
  },
  LastHeader: {
    width: '96px',
  },
};

export const Container = styled.div`
  margin-top: 24px;
`;

export const EndContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

export const Folio = styled.div`
  display: flex;
  color: #04B431;
  font-weight: 700;
  font-size: 14px;
`;

export const SearcherContainer = styled.div`
  display: flex;
  padding: 8px 0;
  align-items: center;
`;

export const SearchTitle = styled.div`
  background-color: #0174DF;
  color: #fff;
  border-radius: 4px;
  padding: 0 8px;
  font-size: 12px;
  display: flex;
  align-items: center;
  font-weight: 700;
  justify-content: center;
  width: 64px;
  height: 24px;
`;

export const RFC = styled.div`
  color: #6E6E6E;
  font-weight: 600;
  font-size: 14px;
`;

export const AddBox = styled(add)`
  fill: #6E6E6E !important;
`;

export const DeleteItem = styled(clear)`
  fill: #FF0000 !important;
`;

export const SubContainer = styled.div`
  border-top: solid 4px #6E6E6E;
  margin-top: 16px;
  padding-bottom: 56px;
`;

export const PricesContainer = styled(EndContainer)`
  display: flex;
  padding-top: 16px;
`;

export const PriceTitle = styled.div`
  background-color: #BDBDBD;
  color: #2E2E2E;
  border-radius: 4px;
  padding: 0 8px;
  font-size: 12px;
  display: flex;
  align-items: center;
  font-weight: 700;
  justify-content: flex-end;
  height: 24px;
`;

export const Value = styled.div`
  display: flex;
  width: 128px;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;
