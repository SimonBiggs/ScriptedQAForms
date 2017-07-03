import { TestBed, inject } from '@angular/core/testing';

import { ModelMeasurementService } from './model-measurement.service';

describe('ModelMeasurementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelMeasurementService]
    });
  });

  it('should be created', inject([ModelMeasurementService], (service: ModelMeasurementService) => {
    expect(service).toBeTruthy();
  }));
});
