import React, { Fragment } from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import InputForm from '../InputForm';
import { PrimaryButton } from '../Button';
import Form from '../Form';

Enzyme.configure({ adapter: new Adapter() });

describe('Form', () => {
  let form;
  const initialValues = { name: '' };
  const onErrorState = { name: 'Error in naming' };
  const onNoErrorState = { name: '' };
  const validateFn = jest.fn()
    .mockReturnValueOnce(onErrorState)
    .mockReturnValueOnce(onNoErrorState);
  const submitFn = jest.fn();
  
  it('should render correctly', () => {
    form = mount(
      <Form
        values={initialValues}
        onSubmit={submitFn}
        onValidate={validateFn}
        render={({
          values,
          errors,
          setValues,
        }) =>
          <Fragment>
            <InputForm
              label="Name"
              errorFeedback={errors.name}
              inputValue={values.name}
              onChange={() => setValues(e.target.value)}
            />
            <PrimaryButton>Submit</PrimaryButton>
          </Fragment>
        }
      />);

    expect(form.state('values')).toBe(initialValues);
    expect(form.find(InputForm).length).toBe(1);
    expect(form.find(PrimaryButton).length).toBe(1);

    describe('setting state correctly and simulate click', () => {
      it('should set "values" state correctly', () => {
        const expectedState = { name: 'Jazz' };
        form.find('input').simulate('change', {target: {value: expectedState }});

        expect(form.state('values')).toBe(expectedState);
      });

      it('should set "errors" state correctly', () => {
        // Will set error upon mock validation when clicking the button
        form.find(PrimaryButton).simulate('click');
        expect(form.state('errors')).toBe(onErrorState);

        // Will clear error upon mock validation when clicking the button again
        form.find(PrimaryButton).simulate('click');
        expect(form.state('errors')).toBe(onNoErrorState);
      });

      it('should be able to submit when no error', () => {
        form.find(PrimaryButton).simulate('click');
        expect(submitFn.mock.calls.length).toBe(1);
      });
    });
  });
});
