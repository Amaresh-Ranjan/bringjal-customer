import { TestBed } from '@angular/core/testing';

import { WalletSocket } from './wallet-socket';

describe('WalletSocket', () => {
  let service: WalletSocket;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalletSocket);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
