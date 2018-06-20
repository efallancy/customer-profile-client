import React, { Fragment } from 'react';

import { TitleHeading } from './components/Heading';
import { PrimaryButton } from './components/Button';
import Form from './components/Form';
import InputForm from './components/InputForm';

const SaveButton = PrimaryButton.extend`
  margin-right: 0.5rem;
`;

const NewCustomerForm = ({ formKey, onSubmitForm, onValidateForm }) =>
  <Form
    key={formKey}
    onSubmit={onSubmitForm}
    onValidate={onValidateForm}
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
  />;

export default NewCustomerForm;
