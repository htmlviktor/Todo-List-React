import React, {Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

  state = {
    term: ''
  }

  onSearch = (evt) => {
    const {value} = evt.target;
    this.setState(({term}) => {
      return {
        term: value
      }
    })
    
    this.props.onSearch(value)
  }

  render() {
    const {term} = this.state
    return (
      <input type="text"
                className="form-control search-input"
                placeholder="type to search" 
                value = {term}
                onChange = {this.onSearch}
                />
    );
  }
};



