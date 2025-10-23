import { TestBed } from '@angular/core/testing';

import { HomeUserServiceService } from './home-user-service.service';

describe('HomeUserServiceService', () => {
  let service: HomeUserServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeUserServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
