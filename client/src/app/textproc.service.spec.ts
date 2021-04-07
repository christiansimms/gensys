import { TestBed } from '@angular/core/testing';

import { TextprocService } from './textproc.service';

describe('TextprocService', () => {
  let service: TextprocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextprocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
