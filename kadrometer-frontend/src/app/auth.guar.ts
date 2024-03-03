import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      const token = this.authService.getToken();
      if (token) {
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const userRole = tokenPayload['role'];

        if (route.data['roles'] && !route.data['roles'].includes(userRole)) {
          this.router.navigate(['/login']);
          return false;
        }

        return true;
      }
    }

    this.router.navigate(['/login']);
    return false;
  }
}
