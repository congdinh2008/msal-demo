import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { AppSettings } from '../../models/app-settings.model';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IAppSettingsService } from '../interfaces/app-setings.interface';
import { AuthenticationHelper } from 'src/helper/core/authentication.helper';
import { LocalStorageKeyConstant } from 'src/constants/local-storage-key.constant';
import { SessionStorageKeyConstant } from 'src/constants/session-storage-key.constant';

export let APP_SETTINGS: AppSettings;

@Injectable()
export class AppSettingsService implements IAppSettingsService {
  //#region Constructors

  private httpClient!: HttpClient;
  public constructor(private handler: HttpBackend) {
    this.httpClient = new HttpClient(this.handler);
  }
  //#endregion

  //#region Application configuration

  /*
   * Load app configuration from json file.
   * */
  public loadAppSettingsAsync(): Observable<AppSettings> {
    if (APP_SETTINGS) {
      return of(APP_SETTINGS);
    }

    // Get app settings from server
    const filePath = '/assets/settings/app-settings.json';
    return this.httpClient.get<AppSettings>(filePath).pipe(
      tap((settings) => {
        const storedSettings = sessionStorage.getItem(
          SessionStorageKeyConstant.appSettings
        );

        if (storedSettings) {
          // use stored app settings
          APP_SETTINGS = JSON.parse(storedSettings);
        } else {
          // use latest app settings
          APP_SETTINGS = settings;
          sessionStorage.setItem(
            SessionStorageKeyConstant.appSettings,
            JSON.stringify(settings)
          );
        }

        this.verifyAppVersion(settings);
      })
    );
  }

  /**
   * verify app version
   */
  private verifyAppVersion(latestSettings: AppSettings): void {
    const storedAppVersion = localStorage.getItem(
      LocalStorageKeyConstant.appVersion
    );

    // if latest app version not match stored app version
    if (
      latestSettings.appVersion &&
      (!storedAppVersion || storedAppVersion !== latestSettings.appVersion)
    ) {
      // store latest app settings
      APP_SETTINGS = latestSettings;
      sessionStorage.setItem(
        SessionStorageKeyConstant.appSettings,
        JSON.stringify(latestSettings)
      );

      // clear local storage
      AuthenticationHelper.clearLocalStorage();

      // store latest app version
      localStorage.setItem(
        LocalStorageKeyConstant.appVersion,
        latestSettings.appVersion
      );
    }
  }

  //#endregion
}
