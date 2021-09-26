import { InjectionToken } from "@angular/core";
import { ITodoService } from "src/services/interfaces/todo-service.interface";

export const TODO_SERVICE_INJECTOR =
  new InjectionToken<ITodoService>('TODO_SERVICE_INJECTOR');