import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SharedService } from './services/shared.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private router: Router, private sharedService: SharedService) {}

  canActivate(): boolean {
    if (!this.sharedService.isAdminin) {
      this.router.navigate(['/user-login']);
      return false;
    }
    return true;
  }
}