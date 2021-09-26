import {
  BrowserCacheLocation,
  IPublicClientApplication,
  LogLevel,
  PublicClientApplication,
} from '@azure/msal-browser';
import { APP_SETTINGS } from '../services/implementation/app-settings.service';

const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1; // Remove this line to use Angular Universal

export function loggerCallback(logLevel: LogLevel, message: string) {}
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      authority: APP_SETTINGS.azureADSettings.instance + APP_SETTINGS.azureADSettings.tenantId,
      clientId: APP_SETTINGS.azureADSettings.clientId,
      redirectUri: APP_SETTINGS.azureADSettings.redirectUriPath,
      postLogoutRedirectUri: APP_SETTINGS.azureADSettings.postLogoutRedirectUri,
      navigateToLoginRequestUrl: false,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.SessionStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11. Remove this line to use Angular Universal
    },
    system: {
      loggerOptions: {
        loggerCallback(logLevel: LogLevel, message: string) {
          console.log(message);
        },
        logLevel: LogLevel.Error,
        piiLoggingEnabled: false
      },
    },
  });
}
