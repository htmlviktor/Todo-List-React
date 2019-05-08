import React, { Component } from 'react';

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
      this.createTodoItem('Drink Cofee'),
      this.createTodoItem('Make awesone App'),
      this.createTodoItem('Have a lunch')
    ],
    term: '',
    filter: 'all'
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }


  deleteItem = (id) => {
    this.setState(({ todoData }) => {
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

  addItem = (text) => {
    this.setState(({ todoData }) => {
      const newItem = this.createTodoItem(text)
      const newArray = [...todoData, newItem];
      return {
        todoData: newArray
      }

    })
  };

  toggleProperty(arr, id, propName) {

    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];

  }

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    });
  };

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    });


  };

  search(items, term) {
    if (term === '') {
      return items
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    })
  }

  onSearch = (value) => {
   this.setState(({term}) => {
     return {
       term: value
     }
   })
  }

  onChangeFilter = (name) => {
    this.setState(({filter}) => {
      return {
        filter: name
      }
    })
  }

  onFilterList = (todoList, filterName) => {
    switch (filterName) {
      case 'active':
        return todoList.filter(({done}) => {
          return !done
        })
      case 'done': 
        return todoList.filter(({done}) => {
          return done
        })
      default: return todoList
    }
  }

  

  render() {
    const { todoData, term, filter } = this.state;
    const visibleItems = this.onFilterList(this.search(todoData, term),
    filter);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearch={this.onSearch}/>
          <ItemStatusFilter 
            onChangeFilter = {this.onChangeFilter}
            filterStatus = {filter}
          />
        </div>
      
        <TodoList todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <AddItem onAddItem={this.addItem} />
      </div>
    );
  }
};


