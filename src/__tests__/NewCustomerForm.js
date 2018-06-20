import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NewCustomerForm from '../NewCustomerForm';
import { TitleHeading } from '../components/Heading';

Enzyme.configure({ adapter: new Adapter() });

describe('NewCustomerForm', () => {
  it('should render correctly', () => {
    const newCustomerForm = mount(
      <NewCustomerForm
        formKey={123}
        onSubmitForm={jest.fn()}
        onValidateForm={jest.fn()}
      />);
    
    expect(newCustomerForm.find('input').length).toBe(2);
    expect(newCustomerForm.find('label').length).toBe(2);
    expect(newCustomerForm.find('button').length).toBe(1);
    expect(newCustomerForm.find(TitleHeading).length).toBe(1);
    expect(newCustomerForm.find(TitleHeading).text()).toBe('New Customer');
  });
});
