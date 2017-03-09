import React, { PropTypes } from 'react';
import { FormControl } from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';

import headers from 'constants/commonHeaders';
import { SuggestWrapper } from './StyledComponents';

const maxEntries = 5;

// Calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : headers
      .filter(header =>
        header.toLowerCase().includes(inputValue),
      )
      .slice(0, maxEntries);
};

// Teach Autosuggest how to calculate the input value for
// every given suggestion.
const getSuggestionValue = suggestion => suggestion;

const renderSuggestion = suggestion => (
  <div>
    {suggestion}
  </div>
);

const renderInputComponent = inputProps => (
  <FormControl type="text" {...inputProps} />
);

export default class HeaderNameAutosuggest extends React.PureComponent {
  static propTypes = {
    input: PropTypes.shape({}).isRequired,
    placeholder: PropTypes.string.isRequired,
  };

  state = {
    suggestions: [],
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  // When the suggest is closed or emptied
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { input, placeholder } = this.props;

    const inputProps = {
      ...input,
      placeholder,
      onChange: (_, { newValue }) => input.onChange(newValue),
    };

    return (
      <SuggestWrapper>
        <Autosuggest
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderInputComponent={renderInputComponent}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </SuggestWrapper>
    );
  }
}

