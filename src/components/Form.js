import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super();
    this.state = {
      values: props.values || {},
      errors: {},
      initialValues: props.values || {},
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleSetValues = this.handleSetValues.bind(this);
    this.handleSetErrors = this.handleSetErrors.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (state.initialValues !== props.values) {
      return ({
        values: props.values,
        errors: {},
        initialValues: props.values,
      });
    }

    return null;
  }

  handleOnSubmit(e) {
    e.preventDefault();

    if (this.props.onValidate && typeof this.props.onValidate === 'function') {
      this.handleValidation(this.state.values);
    } else {
      this.clearForm();
      this.props.onSubmit(this.state.values);
    }
  }

  handleValidation(values) {
    const errors = this.props.onValidate(this.state.values);

    if (
      errors &&
      typeof errors === 'object' &&
      errors.constructor === Object &&
      Object.keys(errors).length
    ) {
      this.handleSetErrors(errors);
    } else {
      this.clearForm();
      this.props.onSubmit(this.state.values);
    }
  }

  handleSetValues(values = {}) {
    this.setState((state) =>
      ({ values: { ...state.values, ...values } }));
  }

  handleSetErrors(errors = {}) {
    this.setState((state) =>
      ({ errors }));
  }

  clearForm() {
    this.setState({
      values: {},
      errors: {}
    });
  }

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        {
          this.props.render({
            values: this.state.values,
            errors: this.state.errors,
            setValues: this.handleSetValues,
          })
        }
      </form>
    );
  }
}

export default Form;
