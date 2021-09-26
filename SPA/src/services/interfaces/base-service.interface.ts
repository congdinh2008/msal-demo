import { Observable } from 'rxjs';

export interface IBaseService {
  /**
   * get all master data
   */
  getAll(): Observable<any[]>;

  /**
   * create master data
   */
  create(params: any): Observable<any>;

  /**
   * get master data
   */
  get(id: any): Observable<any>;

  /**
   * update master data
   */
  update(params: any): Observable<any>;

  /**
   * delete email template
   */
  delete(id: any): Observable<any>;
}
