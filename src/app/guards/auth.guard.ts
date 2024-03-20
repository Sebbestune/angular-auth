import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, pipe, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  // let isLoggedIn = false; 

  // console.log("Trying to log in");

  // const auth: AuthService = inject(AuthService);

  // auth.loggedIn$.subscribe((v) => console.log(v));

  // console.log(isLoggedIn);

  // return isLoggedIn;

  return true;
};
