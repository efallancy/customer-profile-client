import styled from 'styled-components';

export const PageHeading = styled.h1`
  font-size: 48px;
  color: #121958;
  letter-spacing: 0.16px;
`;

export const TitleHeading = PageHeading.withComponent('h3').extend`
  font-size: 28px;
  margin: 0 0 1rem;
`;

export const ErrorHeading = styled.p`
  color: #FF4040;
  font-size: 15px;
`;

export default TitleHeading;