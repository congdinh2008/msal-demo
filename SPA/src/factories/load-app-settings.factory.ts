import { AppSettingsService } from 'src/services/implementation/app-settings.service';
import { AppSettings } from '../models/app-settings.model';

/*
 * Load app settings asynchronously.
 * */
export function loadAppSettingsAsync(
  appSettingsService: AppSettingsService
): () => Promise<AppSettings> {
  return () => appSettingsService.loadAppSettingsAsync().toPromise();
}
