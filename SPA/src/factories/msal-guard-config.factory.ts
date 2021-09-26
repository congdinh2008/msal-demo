import { MsalGuardConfiguration } from '@azure/msal-angular';
import { InteractionType } from '@azure/msal-browser';
import { APP_SETTINGS } from '../services/implementation/app-settings.service';

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Popup,
    authRequest: {
      scopes: APP_SETTINGS.resourceApi.scopes,
    },
    loginFailedRoute: '/',
  };
}
