import { TestBed } from '@angular/core/testing';

import { OrderSocket } from './order-socket';

describe('OrderSocket', () => {
  let service: OrderSocket;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderSocket);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
