import { TestBed, inject } from '@angular/core/testing';

import { AreaLengthConversionService } from './area-length-conversion.service';

describe('AreaLengthConversionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AreaLengthConversionService]
    });
  });

  it('should be created', inject([AreaLengthConversionService], (service: AreaLengthConversionService) => {
    expect(service).toBeTruthy();
  }));
});
