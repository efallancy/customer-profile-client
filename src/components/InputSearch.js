import React, { Component } from 'react';
import styled from 'styled-components';

import { PrimaryButton } from './Button';

const SearchButton = PrimaryButton.extend`
  @media (max-width: 767px) {
    display: block;
  }
`;

const InputTextSearch = styled.input`
  font-size: 20px;
  min-width: 250px;
  border: 2px solid #13D0A7;
  border-radius: 20px;
  padding: 0.5rem;
  margin-right: 1rem;
  outline: none;
  @media (max-width: 767px) {
    display: block;
    margin: 0 0 0.6rem;
  }
`;

const InputSearchWrapper = styled.div`
  margin-bottom: 0.5rem;
  width: 100%;
`;

class InputSearch extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };

    this.handleClickSearch = this.handleClickSearch.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  handleClickSearch() {
    this.props.onClickSearch(this.state.search);
  }

  onInputChange(e) {
    this.setState({
      search: e.target.value
    });
  }

  render() {
    return (
      <InputSearchWrapper>
        <InputTextSearch
          type="text"
          placeholder="Search term"
          value={this.state.search}
          onChange={this.onInputChange}
        />
        <SearchButton onClick={this.handleClickSearch}>search</SearchButton>
      </InputSearchWrapper>
    )
  }
}

export default InputSearch;