import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { underconstructionGuard } from './underconstruction.guard';

describe('underconstructionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => underconstructionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
