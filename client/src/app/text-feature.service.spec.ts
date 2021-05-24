import { TestBed } from '@angular/core/testing';

import { TextFeatureService } from './text-feature.service';

describe('TextFeatureService', () => {
  let service: TextFeatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextFeatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
