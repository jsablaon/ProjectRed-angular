import { TestBed } from '@angular/core/testing';

import { TestListService } from './test-list.service';

describe('TestListService', () => {
  let service: TestListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
