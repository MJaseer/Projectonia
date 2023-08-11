import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('employee')
  const router = inject(Router)

  if(token){
    return true
  } else {
    router.navigate(['/employee/login'])
    return false
  }
};
