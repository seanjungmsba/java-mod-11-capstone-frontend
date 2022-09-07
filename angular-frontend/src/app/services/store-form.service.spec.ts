import { TestBed } from '@angular/core/testing';

import { StoreFormService } from './store-form.service';

describe('StoreFormService', () => {
  let service: StoreFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
