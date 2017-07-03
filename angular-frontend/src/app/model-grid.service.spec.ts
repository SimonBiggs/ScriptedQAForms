import { TestBed, inject } from '@angular/core/testing';

import { ModelGridService } from './model-grid.service';

describe('ModelGridService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelGridService]
    });
  });

  it('should be created', inject([ModelGridService], (service: ModelGridService) => {
    expect(service).toBeTruthy();
  }));
});
