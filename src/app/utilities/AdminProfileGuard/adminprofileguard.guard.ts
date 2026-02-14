import {CanActivateFn, Router} from '@angular/router';
import {AuthenticationService} from "../../services/Authentication/authentication.service";
import {inject} from "@angular/core";

export const adminprofileguardGuard: CanActivateFn = (route, state) => {
  let acceptRoute : boolean = false
  const authService = inject(AuthenticationService)
  const router = inject(Router)
  let isAdminType : string = ""
  if (authService.currentIsLoggedIn) {
    authService.currentLoggedUserType.subscribe(res => isAdminType = res)
    if (isAdminType === "admin") {
      acceptRoute = true
    } else {
      acceptRoute = false
    }
  }
  if (acceptRoute) {
    return true
  }
  else {
    router.navigate(["/loginregister"])
    return false
  }
};
