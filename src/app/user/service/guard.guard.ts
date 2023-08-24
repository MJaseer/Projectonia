import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

export const guardGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router)
  const userService = inject(UserService)
  const authService = inject(AuthService)
  const token = authService.getToken()

  if (token) {
    userService.authenticateUser(token).subscribe((response) => {
      if (response == 'success') {
        console.log(response);
        return true
      } else {
        router.navigate(['/login'])
        return false
      }
    })
    return true
  } else {
    return false
  }



};


