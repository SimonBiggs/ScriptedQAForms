import { TestBed, inject } from '@angular/core/testing';

import { CurrentSettingsService } from './current-settings.service';

describe('CurrentSettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentSettingsService]
    });
  });

  it('should be created', inject([CurrentSettingsService], (service: CurrentSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
