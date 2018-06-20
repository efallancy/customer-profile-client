import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from '../App';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  let wrapper;
  const initialState = {
    customers: [],
    showNewCustomerForm: true,
    editCustomerProfile: null,
    errorMessage: '',
  };

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Initialises state correctly', () => {
    expect(wrapper.state()).toEqual(initialState);
  });
})
