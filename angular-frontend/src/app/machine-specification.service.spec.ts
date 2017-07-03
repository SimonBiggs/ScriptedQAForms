import { TestBed, inject } from '@angular/core/testing';

import { MachineSpecificationService } from './machine-specification.service';

describe('MachineSpecificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MachineSpecificationService]
    });
  });

  it('should be created', inject([MachineSpecificationService], (service: MachineSpecificationService) => {
    expect(service).toBeTruthy();
  }));
});
