import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import isEmail from 'validator/lib/isEmail';

import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from './api/customers';
import { PageHeading, TitleHeading, ErrorHeading } from './components/Heading';
import { PrimaryButton, SecondaryButton } from './components/Button';
import InputSearch from './components/InputSearch';
import Table, { TableRow, TableData } from './components/Table';
import Card from './components/Card';
import Form from './components/Form';
import InputForm from './components/InputForm';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Layout = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

const LeftSection = styled.div`
  display: inline-block;
  margin-right: 1rem;
  width: calc(100% / 8 * 6);
  @media (max-width: 1200px) {
    display: block;
    margin: 0;
    width: 100%;
  }
`;

const RightSection = styled.div`
  display: inline-block;
  margin-left: 1rem;
  width: calc(100% / 8 * 2);
  @media (max-width: 1200px) {
    display: block;
    margin: 0;
    width: 100%;
  }
`;

const SaveButton = PrimaryButton.extend`
  margin-right: 0.5rem;
`;

const CancelButton = SecondaryButton.extend`
  padding: 0.4rem;
`;

const EditButton = PrimaryButton.extend`
  font-size: 14px;
  margin-right: 0.5rem;
`;

const RemoveButton = SecondaryButton.extend`
  font-size: 14px;
  padding: 0.4rem;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      customers: [],
      showNewCustomerForm: true,
      editCustomerProfile: null,
      errorMessage: '',
    };

    this.onClickSearch = this.onClickSearch.bind(this);
    this.toggleShowCustomerForm = this.toggleShowCustomerForm.bind(this);
    this.handleSubmitNewCustomer = this.handleSubmitNewCustomer.bind(this);
    this.handleSubmitExistingCustomer = this.handleSubmitExistingCustomer.bind(this);
    this.validateCustomerForm = this.validateCustomerForm.bind(this);
    this.onClickEditCustomer = this.onClickEditCustomer.bind(this);
    this.onClickRemoveCustomer = this.onClickRemoveCustomer.bind(this);
    this.getCustomerProfiles = this.getCustomerProfiles.bind(this);
  }

  componentDidMount() {
    this.getCustomerProfiles();
  }

  getCustomerProfiles() {
    getCustomers().then((res) => {
      this.setState({
        customers: res.data,
        errorMessage: ''
      });
    }).catch(() => {
      this.setState({
        errorMessage: 'Error in fetching customer profiles'
      });
    })
  }

  onClickSearch(value) {
    const query = { term: value };

    getCustomers(query).then((res) => {
      this.setState({
        customers: res.data,
        errorMessage: ''
      });
    }).catch(() => {
      this.setState({
        errorMessage: `Error in searching term ${value}`
      });
    });
  }

  toggleShowCustomerForm(e) {
    e.preventDefault();
    this.setState((state) => ({ showNewCustomerForm: !state.showNewCustomerForm }));
  }

  handleSubmitNewCustomer(values) {
    createCustomer(values).then((res) => {
      const newCustomer = res.data;
      this.setState({
        customers: [ newCustomer, ...this.state.customers],
        errorMessage: ''
      });
    }).catch((err) => {
      const message = err.response.data.message || 'Error in creating new customer';
      this.setState({
        errorMessage: message
      });
    })
  }

  handleSubmitExistingCustomer(values) {
    updateCustomer(values).then((res) => {
      const updatedCustomer = res.data;

      const customers = this.state.customers.reduce(
        (list, customer) => {
          if (customer.id === values.id) {
            return list.concat(updatedCustomer);
          }
          return list.concat(customer);
        }, []
      );
  
      this.setState({
        customers,
        showNewCustomerForm: true,
        editCustomerProfile: null,
      });
    }).catch((err) => {
      const message = err.response.data.message || 'Error in updating customer details';
      this.setState({
        showNewCustomerForm: true,
        errorMessage: message
      });
    })
  }

  onClickRemoveCustomer(customerId) {
    return () => {
      deleteCustomer(customerId).then((res) => {
        const customers = this.state.customers.reduce(
          (list, customer) => {
            if (customer.id !== customerId) {
              return list.concat(customer);
            }
            return list;
          }, []
        );
        this.setState({
          showNewCustomerForm: true,
          customers
        });
      }).catch((err) => {
        const message = err.response.data.message || 'Error in deleting customer profile';
        this.setState({
          showNewCustomerForm: true,
          errorMessage: message
        });
      });
    }
  }

  onClickEditCustomer(customerId) {
    return () => {
      const customerData = this.state.customers.find(
        (customer) => customer.id === customerId
      );
      this.setState({
        showNewCustomerForm: false,
        editCustomerProfile: customerData
      });
    }
  }

  validateCustomerForm(values) {
    const { email, name } = values;
    let errors = {};

    if (!email || !isEmail(email)) {
      errors.email = 'Invalid email address'
    }

    if (!name) {
      errors.name = 'Name is not specified';
    }

    return errors;
  }

  render() {
    return (
      <Container>
        <PageHeading>Customer Profile</PageHeading>
        <InputSearch onClickSearch={this.onClickSearch} />
        {this.state.errorMessage &&
          <ErrorHeading>{this.state.errorMessage}</ErrorHeading>}
        <Layout>
          <LeftSection>
            <Card>
              <Table headers={['ID', 'Name', 'Email', 'Action']}>
                {
                  this.state.customers.map((customer, index) =>
                    <TableRow key={index}>
                      <TableData>{customer.id}</TableData>
                      <TableData>{customer.name}</TableData>
                      <TableData>{customer.email}</TableData>
                      <TableData>
                        <EditButton
                          disabled={!this.state.showNewCustomerForm}
                          onClick={this.onClickEditCustomer(customer.id)}
                        >
                          edit
                        </EditButton>
                        <RemoveButton
                          disabled={!this.state.showNewCustomerForm}
                          onClick={this.onClickRemoveCustomer(customer.id)}
                        >
                          remove
                        </RemoveButton>
                      </TableData>
                    </TableRow>
                  )
                }
              </Table>
            </Card>
          </LeftSection>
          <RightSection>
            <Card>
              {
                this.state.showNewCustomerForm ?
                  <Form
                    key={this.state.showNewCustomerForm}
                    onSubmit={this.handleSubmitNewCustomer}
                    onValidate={this.validateCustomerForm}
                    values={{
                      name: '',
                      email: ''
                    }}
                    render={({
                      values,
                      errors,
                      setValues
                    }) =>
                      <Fragment>
                        <TitleHeading>New Customer</TitleHeading>
                        <InputForm
                          label="Name"
                          placeholder="Name"
                          errorFeedback={errors.name || ''}
                          onChange={(e) => {
                            setValues({ name: e.target.value || '' });
                          }}
                          inputValue={values.name || ''}
                        />
                        <InputForm
                          label="Email"
                          placeholder="Email"
                          errorFeedback={errors.email || ''}
                          onChange={(e) => {
                            setValues({ email: e.target.value || '' });
                          }}
                          inputValue={values.email || ''}
                        />
                        <div>
                          <SaveButton>save</SaveButton>
                        </div>
                      </Fragment>
                    }
                  /> :
                  <Form
                    key={this.state.showNewCustomerForm}
                    onSubmit={this.handleSubmitExistingCustomer}
                    onValidate={this.validateCustomerForm}
                    values={this.state.editCustomerProfile}
                    render={({
                      values,
                      errors,
                      setValues
                    }) =>
                      <Fragment>
                        <TitleHeading>Existing Customer</TitleHeading>
                        <p>ID: {values.id}</p>
                        <InputForm
                          label="Name"
                          placeholder="Name"
                          errorFeedback={errors.name || ''}
                          onChange={(e) => {
                            setValues({ name: e.target.value || '' });
                          }}
                          inputValue={values.name || ''}
                        />
                        <InputForm
                          label="Email"
                          placeholder="Email"
                          errorFeedback={errors.email || ''}
                          onChange={(e) => {
                            setValues({ email: e.target.value || '' });
                          }}
                          inputValue={values.email || ''}
                        />
                        <div>
                          <SaveButton>save</SaveButton>
                          <CancelButton onClick={this.toggleShowCustomerForm}>
                            cancel
                          </CancelButton>
                        </div>
                      </Fragment>
                    }
                  />
              }
            </Card>
          </RightSection>
        </Layout>
      </Container>
    );
  }
}

export default App;
