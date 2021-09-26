import { Component, Inject, OnInit } from '@angular/core';
import { Todo } from '../../../models/todos/todo';
import { TODO_SERVICE_INJECTOR } from 'src/constants/injection-token.constant';
import { ITodoService } from 'src/services/interfaces/todo-service.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  public todos: any;

  public showDetails = false;
  public selectedId = '';

  constructor(
    @Inject(TODO_SERVICE_INJECTOR)
    private todoService: ITodoService
  ) {}

  ngOnInit(): void {
    this.getTodos();
  }

  /**
   * add
   */
  public add() {
    this.selectedId = '';
    this.showDetails = true;
  }

  /**
   * edit
   */
  public edit(id: any) {
    this.selectedId = id;
    this.showDetails = true;
  }

  /**
   * on cancel details
   */
  public onCancelDetails() {
    this.showDetails = false;
    this.selectedId = '';
  }

  /**
   * on save details
   */
  public onSaveDetails() {
    this.showDetails = false;
    this.selectedId = '';
    this.getTodos();
  }

  /**
   * delete
   */
  public delete(id: any) {
    if(confirm("Are you sure to delete "+name)) {
      this.todoService.delete(id).subscribe((response) => {
        if(response){
          alert("Todo deleted")
        }
        this.getTodos();
      });
    }
  }

  private getTodos(): void {
    this.todoService.getAll().subscribe((res: any) => {
      console.log(res);
      
      this.todos = res;
    });
  }
}
