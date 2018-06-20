import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from '../App';
import Table from '../components/Table';
import { ErrorHeading } from '../components/Heading';
import NewCustomerForm from '../NewCustomerForm';
import EditCustomerForm from '../EditCustomerForm';
import { SecondaryButton } from '../components/Button';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  let wrapper;
  const initialState = {
    customers: [],
    showNewCustomerForm: true,
    editCustomerProfile: null,
    errorMessage: '',
  };

  const customersList = [
    { id: '42', name: 'Chrome', email: 'chrome@doe.com' },
    { id: '8', name: 'Safari', email: 'safari@doe.com' },
    { id: '22', name: 'Firefox', email: 'firefox@doe.com' },
  ];

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should initialise state correctly', () => {
    expect(wrapper.state()).toEqual(initialState);
  });

  it('should render customer profile if exists', () => {
    expect(wrapper.find(Table).render().find('tbody tr').length).toBe(0);
    wrapper.setState({ customers: customersList });
    expect(wrapper.find(Table).render().find('tbody tr').length).toBe(3);
  });

  it('should display error message when error exist', () => {
    const message = 'Sample error message';
    wrapper.setState({ errorMessage: message });
    expect(wrapper.find(ErrorHeading).length).toBe(1);
    expect(wrapper.find(ErrorHeading).render().text()).toBe(message);
  });

  it('should display NewCustomerForm if showNewCustomerForm is true', () => {
    expect(wrapper.find(NewCustomerForm).length).toBe(1);
    expect(wrapper.find(EditCustomerForm).length).toBe(0);
  });

  it('should display EditCustomerForm if showNewCustomerForm is false', () => {
    wrapper.setState({ showNewCustomerForm: false });
    expect(wrapper.find(NewCustomerForm).length).toBe(0);
    expect(wrapper.find(EditCustomerForm).length).toBe(1);
  });

  describe('Class methods', () => {
    it('validateCustomerForm should return error in object form', () => {
      const value = {
        email: 'notvalid.email',
        name: ''
      };
      const expectedErrorObject = {
        email: 'Invalid email address',
        name: 'Name is not specified'
      };

      expect(wrapper.instance().validateCustomerForm(value)).toEqual(expectedErrorObject);
    });

    it('toggleShowCustomerForm should toggle state to display NewCustomerForm from EditCustomerForm', () => {
      const mockEvent = { preventDefault: jest.fn() };
      wrapper.setState({ showNewCustomerForm: false });

      wrapper.instance().toggleShowCustomerForm(mockEvent);
      expect(wrapper.state().showNewCustomerForm).toBe(true);
    });

    it('onClickEditCustomer should set customer profile in state and toggle showNewCustomerForm state', () => {
      wrapper.setState({ customers: customersList });
      wrapper.instance().onClickEditCustomer('42')();

      expect(wrapper.state().showNewCustomerForm).toBe(false);
      expect(wrapper.state().editCustomerProfile).toEqual({ id: '42', name: 'Chrome', email: 'chrome@doe.com' });
    });
  });
});
