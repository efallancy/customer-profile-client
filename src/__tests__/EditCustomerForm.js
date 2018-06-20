import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EditCustomerForm from '../EditCustomerForm';
import { TitleHeading } from '../components/Heading';

Enzyme.configure({ adapter: new Adapter() });

describe('EditCustomerForm', () => {
  it('should render correctly', () => {
    const mockData = {
      id: 'abc123',
      name: 'Jazz',
      email: 'jazz@music.com'
    };

    const editCustomerForm = mount(
      <EditCustomerForm
        formKey={123}
        onSubmitForm={jest.fn()}
        onValidateForm={jest.fn()}
        initialValues={mockData}
        onClickCancel={jest.fn()}
      />);
    
    expect(editCustomerForm.find('input').length).toBe(2);
    expect(editCustomerForm.find('label').length).toBe(2);
    expect(editCustomerForm.find('button').length).toBe(2);
    expect(editCustomerForm.find('p').length).toBe(1);
    expect(editCustomerForm.find(TitleHeading).length).toBe(1);
    expect(editCustomerForm.find(TitleHeading).text()).toBe('Existing Customer');
  });
});
