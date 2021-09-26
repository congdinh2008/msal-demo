import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { InteractionStatus } from '@azure/msal-browser';
import { filter, takeUntil } from 'rxjs/operators';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';

@Injectable()
export class AuthenticatedUserGuard implements CanActivate, CanLoad {
  private readonly _destroying$ = new Subject<void>();
  //#region Constructor

  public constructor(
    protected router: Router,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  //#endregion

  //#region Methods

  /*
   * Whether user can access to authenticated modules or not.
   * */
  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let result = false;
    // if authenticated
    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        if (this.authService.instance.getAllAccounts().length > 0) {
          result = true;
        }
      });

    if (result) {
      return result;
    }
    // if not authenticated
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  /*
   * Whether module can be loaded or not.
   * */
  public canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    let result = false;
    // if authenticated
    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        if (this.authService.instance.getAllAccounts().length > 0) {
          result = true;
        }
      });
    return result;
  }

  // unsubscribe to events when component is destroyed
  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
  //#endregion
}
