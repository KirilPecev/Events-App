import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.checkLogin();
  }

  checkLogin(): boolean {
    if (!this.userService.isLoggedIn) { return true }
    
    this.router.navigate(['']);
    return false;
  }

}
