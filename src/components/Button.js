import styled from 'styled-components';

export const PrimaryButton = styled.button`
  font-size: 20px;
  background-color: #13D0A7;
  border: none;
  border-radius: 20px;
  box-sizing: border-box;
  color: #FFFFFF;
  padding: 0.5rem;
  min-width: 100px;
  margin: 0.5rem 0;
  outline: none;
  &:hover {
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  }
`;

export const SecondaryButton = PrimaryButton.extend`
  background-color: #FFFFFF;
  border: 2px solid #13D0A7;
  color: #13D0A7;
`;

export default PrimaryButton;