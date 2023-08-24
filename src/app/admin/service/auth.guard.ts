import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminService } from './admin.service';
import { HelperService } from './helper.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const adminService = inject(AdminService)
  const helperService = inject(HelperService)
  const token = adminService.getToken()

  if (token) {
    helperService.authenticateAdmin(token).subscribe((response) => {
      if (response == 'success') {
        console.log(response);
        return true
      } else {
        router.navigate(['/admin/login'])
        return false
      }
    })
    return true
  } else {
    return false
  }
};
