import styled from 'styled-components';
import label from 'material-ui/svg-icons/maps/local-offer';

export const Title = styled.div`
  color: #088A08;
  font-size: 24px;
  font-weight: 700;
  display: flex;
`;

export const Label = styled(label)`
  display: flex;
  width: 30px !important;
  height: 30px !important;
  fill: #848484 !important;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 32px;
`;

export const Container = styled.div`
  margin: 0 32px 0 200px;
  padding-bottom: 32px;
`;
