import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subject } from 'rxjs';

export function noAuthGuard() {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
    const subject = new Subject<boolean | UrlTree>();

    authService.$user.subscribe((user) => {
      const response = !user ? true : router.createUrlTree(["/home"]);

      subject.next(response);
    })
  
    return subject.asObservable();
} 