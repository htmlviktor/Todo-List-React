import React, {Component} from 'react';
import './add-item.css';

export default class AddItem extends Component {

  state = {
    label: ''
  }

  onLabelChange = (evt) => {
    this.setState({
      label: evt.target.value
    })
  }

  onSubmit = (evt) => {
    evt.preventDefault();
    this.props.onAddItem(this.state.label)
    this.setState({
      label: ''
    });
  }

  render() {
    return (
      <form className = "item-add-form d-flex"
            onSubmit = {this.onSubmit}>
        <input type = "text" 
        className = "form-control" 
        onChange = {this.onLabelChange}
        value = {this.state.label}
        placeholder="What needs to be done?"/>
        <button 
        className = "btn btn-info add-item"
        >Add task</button>
      </form>
    )
  }
}