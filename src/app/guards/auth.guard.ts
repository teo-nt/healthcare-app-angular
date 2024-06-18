import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const patientAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authService = inject(AuthService)

  if (!authService.user() || !authService.isLoggedIn()) {  
    return router.navigate(['welcome', 'login'])
  }

  if (authService.user().role === 'Patient') {
    return true
  } else if (authService.user().role === 'Doctor') { 
    return router.navigate(['doctor'])
  } else if (authService.user().role === 'Admin') {
    return router.navigate(['admin'])
  }

  return router.navigate(['welcome', 'login'])
};


export const doctorAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authService = inject(AuthService)

  if (!authService.user() || !authService.isLoggedIn()) {    
    return router.navigate(['welcome', 'login'])
  }

  if (authService.user().role === 'Patient') {
    return router.navigate(['patient'])
  } else if (authService.user().role === 'Doctor') { 
    return true
  } else if (authService.user().role === 'Admin') {
    return router.navigate(['admin'])
  }

  return router.navigate(['welcome', 'login'])
};


export const adminAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authService = inject(AuthService)

  if (!authService.user() || !authService.isLoggedIn()) {
    return router.navigate(['welcome', 'login'])
  }

  if (authService.user().role === 'Patient') {
    return router.navigate(['patient'])
  } else if (authService.user().role === 'Doctor') { 
    return router.navigate(['doctor'])
  } else if (authService.user().role === 'Admin') {
    return true
  }

  return router.navigate(['welcome', 'login'])
};
