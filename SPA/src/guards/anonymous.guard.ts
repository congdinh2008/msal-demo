import { Inject, Injectable, OnInit } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AnonymousGuard implements CanActivate {
  /**
   * Constructor
   */
  private readonly _destroying$ = new Subject<void>();

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        let returnUrl =
          this.activatedRoute.snapshot.queryParams['returnUrl'] || '/guest';
        if (this.authService.instance.getAllAccounts().length > 0) {
          this.router.navigateByUrl(returnUrl);
        }
      });
      
    return true;
  }

  // unsubscribe to events when component is destroyed
  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
