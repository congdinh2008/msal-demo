import { AzureADSettings } from './azure-ad-settings.model';

export class AppSettings {
  public appTitle!: string;

  public appVersion!: string;

  public clientId!: string;

  public baseUrl!: string;

  public authenticatedRedirectUrl!: string;

  public azureADSettings!: AzureADSettings;

  public loginType!: string[];

  public redirectToAzureAD!: boolean;

  public resourceApi!: ResourceApi;
}

export class ResourceApi {
  public endpoint!: string;

  public scopes!: string[];
}
