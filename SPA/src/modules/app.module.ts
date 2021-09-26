import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MsalGuard,
  MsalBroadcastService,
  MsalModule,
  MsalService,
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MsalRedirectComponent,
  MsalInterceptor,
  MSAL_INTERCEPTOR_CONFIG,
} from '@azure/msal-angular';

import { GuestLayoutModule } from './shared/guest-layout/guest-layout.module';
import { ManagerLayoutModule } from './shared/manager-layout/manager-layout.module';
import { AnonymousLayoutModule } from './shared/anonymous-layout/anonymous-layout.module';
import { AnonymousGuard } from 'src/guards/anonymous.guard';
import { AuthenticatedUserGuard } from 'src/guards/authenticated-user.guard';
import { AppSettingsService } from 'src/services/implementation/app-settings.service';
import { loadAppSettingsAsync } from 'src/factories/load-app-settings.factory';
import { MSALInstanceFactory } from 'src/factories/msal-instance.factory';
import { MSALGuardConfigFactory } from 'src/factories/msal-guard-config.factory';
import { MSALInterceptorConfigFactory } from 'src/factories/msal-interceptor-config.factory';
import { WINDOW_PROVIDERS } from 'src/services/implementation/window.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AnonymousLayoutModule,
    GuestLayoutModule,
    ManagerLayoutModule,
    MsalModule,
  ],
  providers: [
    WINDOW_PROVIDERS,
    Title,
    AppSettingsService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadAppSettingsAsync,
      multi: true,
      deps: [AppSettingsService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalService,
    MsalBroadcastService,
    MsalGuard,
    AnonymousGuard,
    AuthenticatedUserGuard,
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule {}
