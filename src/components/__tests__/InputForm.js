import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import InputForm from '../InputForm';

Enzyme.configure({ adapter: new Adapter() });

describe('InputForm', () => {
  it('should render correctly without label and errorFeedback props', () => {
    const inputForm = mount(
      <InputForm />);
    
    expect(inputForm.find('input').length).toBe(1);
    expect(inputForm.find('label').length).toBe(0);
    expect(inputForm.find('p').length).toBe(0);
  });

  it('should render correctly with label and errorFeedback props', () => {
    const labelText = 'Name';
    const errorText = 'Name not specified'; 
    const inputForm = mount(
      <InputForm
        label={labelText}
        errorFeedback={errorText}
      />);
    
    expect(inputForm.find('input').length).toBe(1);
    expect(inputForm.find('label').length).toBe(1);
    expect(inputForm.find('label').text()).toBe(labelText);
    expect(inputForm.find('p').length).toBe(1);
    expect(inputForm.find('p').text()).toBe(errorText);
  });
});
