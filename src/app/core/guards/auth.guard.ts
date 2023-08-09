import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subject } from 'rxjs';

export function authGuard() {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const subject = new Subject<boolean | UrlTree>();

  authService.$user.subscribe((user) => {
    console.log(user)
    const response = !!user ? true : router.createUrlTree(["/login"]);

    subject.next(response);
  })

  return subject.asObservable();
} 