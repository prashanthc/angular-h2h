import { TestBed } from '@angular/core/testing';

import { FakeInterceptorService } from './fake-interceptor.service';

describe('FakeInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FakeInterceptorService = TestBed.get(FakeInterceptorService);
    expect(service).toBeTruthy();
  });
});
