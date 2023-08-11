import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const guardGuard: CanActivateChildFn = (childRoute, state) => {
  const token = localStorage.getItem('data')
  const router = inject(Router)

  if(token){
    return true
  } else {
    router.navigate(['/login'])
    return false
  }
};

