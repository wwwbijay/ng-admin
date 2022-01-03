import { TestBed } from '@angular/core/testing';

import { SignsDataService } from './signs-data.service';

describe('SignsDataService', () => {
  let service: SignsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
