import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: block;
  font-size: 18px;
  margin-bottom: 0.4rem;
`;

const InputText = styled.input`
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 18px;
  padding: 0.4rem;
  width: 100%;
  &:focus {
    outline: none;
    border: 2px solid #13D0A7;
  }
  @media (max-width: 767px) {
    display: block;
    margin: 0 0 0.6rem;
  }
`;

const InputFormWrapper = styled.div`
  margin-bottom: 1rem;
`;

const InputErrorFeedback = styled.p`
  color: red;
  font-size: 15px;
  margin-top: 5px;
`;

const InputForm = ({
  label = '',
  placeholder = '',
  inputValue,
  onChange,
  errorFeedback = ''
}) =>
  <InputFormWrapper>
    {label && <Label>{label}</Label>}
    <InputText
      placeholder={placeholder}
      onChange={onChange}
      value={inputValue}
    />
    {
      errorFeedback &&
        <InputErrorFeedback>
          {errorFeedback}
        </InputErrorFeedback>
    }
  </InputFormWrapper>

  export default InputForm;
