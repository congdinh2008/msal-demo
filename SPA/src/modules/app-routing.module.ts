import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { AnonymousGuard } from 'src/guards/anonymous.guard';
import { AuthenticatedUserGuard } from 'src/guards/authenticated-user.guard';
import { AnonymousLayoutComponent } from './shared/anonymous-layout/anonymous-layout.component';
import { GuestLayoutComponent } from './shared/guest-layout/guest-layout.component';
import { ManagerLayoutComponent } from './shared/manager-layout/manager-layout.component';

/**
 * MSAL Angular can protect routes in your application
 * using MsalGuard. For more info, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/initialization.md#secure-the-routes-in-your-application
 */
const routes: Routes = [
  {
    path: 'login',
    component: AnonymousLayoutComponent,
    canActivate: [AnonymousGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./login/login.module').then((m) => m.LoginModule),
      },
    ],
  },
  {
    path: '',
    component: GuestLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'guest',
        pathMatch: 'full',
      },
      {
        path: 'guest',
        loadChildren: () =>
          import('./guest/guest.module').then((m) => m.GuestModule),
      },
    ],
  },
  {
    path: 'manager',
    component: ManagerLayoutComponent,
    canActivate: [AuthenticatedUserGuard],
    canLoad: [AuthenticatedUserGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./manager/manager.module').then((m) => m.ManagerModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: ''
  }
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      // Don't perform initial navigation in iframes
      initialNavigation: !isIframe ? 'enabled' : 'disabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
