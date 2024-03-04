import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

export function authenticationGuard(): CanActivateFn {
  return () => {
    const authService: AuthService = inject(AuthService);
    
    if (authService.hasAccess() ) {
      return true;
    }
    authService.goLogin();
    return false;
  };
}