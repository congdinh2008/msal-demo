import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MsalService } from '@azure/msal-angular';
import { BaseService } from './base.service';
import { ITodoService } from '../interfaces/todo-service.interface';
import { APP_SETTINGS } from './app-settings.service';

@Injectable()
export class TodoService extends BaseService implements ITodoService {
  constructor(public http: HttpClient, public authService: MsalService) {
    super(APP_SETTINGS.resourceApi.endpoint, http, authService);
  }
}
