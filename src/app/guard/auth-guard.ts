import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { routes } from '../app.routes';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  if(localStorage.getItem('loginToken')) {
    return true;
  }else{
    router.navigate(['/login']);
    return false;
  }
  
};
