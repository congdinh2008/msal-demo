import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { TODO_SERVICE_INJECTOR } from 'src/constants/injection-token.constant';
import { TodoService } from 'src/services/implementation/todo.service';
import { TodoDetailsComponent } from './todo-details/todo-details.component';

@NgModule({
  declarations: [TodoComponent, TodoDetailsComponent],
  imports: [CommonModule, ReactiveFormsModule, TodoRoutingModule],
  exports: [TodoComponent],
  providers: [{ provide: TODO_SERVICE_INJECTOR, useClass: TodoService }],
})
export class TodoModule {}
