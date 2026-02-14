import {CanActivateFn, Router} from '@angular/router';
import {inject, Inject} from "@angular/core";

export const underconstructionGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  router.navigate(["undercon"])
  return false;
};
