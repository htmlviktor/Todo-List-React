import React, {Component} from 'react';
import './add-item.css';

export default class AddItem extends Component {

  render() {
    const {onAddItem} = this.props;
    return (
      <div>
        <button 
        className = "btn btn-info add-item"
        onClick = {onAddItem}
        >Add task</button>
      </div>
    )
  }
}