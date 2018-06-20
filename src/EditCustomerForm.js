import React, { Fragment } from 'react';

import { TitleHeading } from './components/Heading';
import { PrimaryButton, SecondaryButton } from './components/Button';
import Form from './components/Form';
import InputForm from './components/InputForm';

const SaveButton = PrimaryButton.extend`
  margin-right: 0.5rem;
`;

const CancelButton = SecondaryButton.extend`
  padding: 0.4rem;
`;

const EditCustomerForm = ({
  initialValues,
  formKey,
  onSubmitForm,
  onValidateForm,
  onClickCancel
}) =>
  <Form
    key={formKey}
    onSubmit={onSubmitForm}
    onValidate={onValidateForm}
    values={initialValues}
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
          <CancelButton onClick={onClickCancel}>
            cancel
          </CancelButton>
        </div>
      </Fragment>
    }
  />;

export default EditCustomerForm;
