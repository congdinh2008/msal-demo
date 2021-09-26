import { Observable } from 'rxjs';
import { AppSettings } from '../../models/app-settings.model';

export interface IAppSettingsService {
  /*
   * Load app configuration from json file.
   * */
  loadAppSettingsAsync(): Observable<AppSettings>;
}
