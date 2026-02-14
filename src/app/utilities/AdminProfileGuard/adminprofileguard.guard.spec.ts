import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminprofileguardGuard } from './adminprofileguard.guard';

describe('adminprofileguardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminprofileguardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
