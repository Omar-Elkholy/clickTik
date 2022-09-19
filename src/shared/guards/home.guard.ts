import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {

  /***
    THIS GUARD PREVENTS ROUTING TO LOGIN PAGE AFTER LOGIN 
  ***/

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.loggedInUser$
      .pipe(
        map(user => {
          if (!user) return true;
          this.router.navigate(['/home'])
        })
      );
  }
}
