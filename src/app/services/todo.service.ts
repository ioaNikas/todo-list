import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private nextId: number

  constructor() {
    let todoList = this.getTodoList();

    if (todoList.length == 0) {
      this.nextId = 0;
    } else {
      let maxId = todoList[todoList.length - 1].id;
      this.nextId = maxId + 1;
    }
  }

  public addTodo(text: string): void {
    let todo = new Todo(this.nextId, text);
    let todoList = this.getTodoList();
    todoList.push(todo);
    this.setLocalStoradeTodoList(todoList);
    this.nextId++;
  }

  public getTodoList(): Todo[] {
    let localStorageItem = JSON.parse(localStorage.getItem('todoList'));
    return localStorageItem == null ? [] : localStorageItem.todoList;
  }


  public removeTodo(id: number): void {
    let todoList = this.getTodoList();
    todoList = todoList.filter((todo) => todo.id != id);
    this.setLocalStoradeTodoList(todoList);
  }

  private setLocalStoradeTodoList(todoList: Todo[]): void {
    localStorage.setItem('todoList', JSON.stringify({ todoList: todoList }));
  }

}