import { HttpClient } from '@angular/common/http';
import { MsalService } from '@azure/msal-angular';
import { IBaseService } from '../interfaces/base-service.interface';
import { Observable } from 'rxjs';

export class BaseService implements IBaseService {
  protected url: string = '';
  protected accessToken!: string;

  constructor(
    protected urlType: string,
    protected http: HttpClient,
    protected authService: MsalService
  ) {
    this.url = urlType;
  }

  getAll(): Observable<any> {
    return this.http.get(this.url);
  }

  get(id: any): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  create(params: any): Observable<any> {
    return this.http.post(this.url, params);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }

  update(params: any): Observable<any> {
    return this.http.put(this.url + '/' + params.id, params);
  }
}
