import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../../services/Authentication/authentication.service";

export const profileguardGuard: CanActivateFn = (route, state) => {
  let acceptRoute : boolean = false;
  let isUserLoggedIn : boolean = false;
  const authService = inject(AuthenticationService)
  const router = inject(Router)

  authService.currentIsLoggedIn.subscribe(res => {
    if (!res) {
      router.navigate(["loginregister"])
      isUserLoggedIn = false
    }
    else {
      isUserLoggedIn = true
    }
  })
  return isUserLoggedIn
};
