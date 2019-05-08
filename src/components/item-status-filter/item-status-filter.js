import React, { Component } from 'react';

import './item-status-filter.css';

const filterMap = [
  {name: 'all', label: 'All'},
  {name: 'active', label: 'Active'},
  {name: 'done', label: 'Done'}
]

export default class ItemStatusFilter extends Component {

  render() {
    const {filterStatus, onChangeFilter} = this.props;
    const filters = filterMap.map(({name, label}) => {
      return <button type="button"
      onClick = {() => {
        onChangeFilter(name)
      }}
      key = {name}
      className={name === filterStatus ? 'btn btn-info' : 'btn btn-outline-secondary'}>{label}</button>
    });
    return (
      <div className="btn-group">
        {filters}
      </div>
    );
  }
};

