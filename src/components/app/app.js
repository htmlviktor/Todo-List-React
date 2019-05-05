import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddItem from '../add-item';

import './app.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      { label: 'Drink Coffee', important: false, id: 1 },
      { label: 'Make Awesome App', important: true, id: 2 },
      { label: 'Have a lunch', important: false, id: 3 }
    ],
  };

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      };
    });
  }

  addItem = () => {
    this.setState(({todoData}) => {
      const newItem = {label: 'New Task', important: false, id: this.maxId++};
      const newArray = [...todoData, newItem];
      console.log(this.maxId)
      return {
        todoData: newArray
      }
      
    })
  };

  onToggleImportant = (id) => {
    console.log('Toggle Important', id)
  };

  onToggleDone = (id) => {
    console.log('Toggle Done', id)
  };

  render() {
    const {todoData} = this.state;
    return (
      <div className="todo-app">
        <AppHeader toDo={1} done={3} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
  
        <TodoList todos={todoData} 
          onDeleted = {this.deleteItem}
          onToggleImportant = {this.onToggleImportant}
          onToggleDone = {this.onToggleDone}
        />
        <AddItem onAddItem = {this.addItem}/>
      </div>
    );
  }
};


