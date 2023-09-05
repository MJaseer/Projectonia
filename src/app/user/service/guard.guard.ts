import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

export const guardGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router)
  const userService = inject(UserService)
  const authService = inject(AuthService)
  const token = authService.getToken()
  let data = false
  if (token) {
    // const response = userService.authenticateUser(token)
    // response.subscribe((response) => {
    //   if (response == 'success') {
    //     data = true
    //     return data
    //   } else {
    //     router.navigate(['/login'])
    //     return data
    //   }
    // })
    return true
  } else {
    router.navigate(['/login'])
    return false
  }



};


