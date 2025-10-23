import { TestBed } from '@angular/core/testing';

import { UserSotrageService } from './user-sotrage.service';

describe('UserSotrageService', () => {
  let service: UserSotrageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSotrageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
