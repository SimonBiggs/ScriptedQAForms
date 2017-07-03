import { Injectable } from '@angular/core';

import { AreaLengthConversionService } from './area-length-conversion.service'

@Injectable()
export class ModelMeasurementService extends AreaLengthConversionService {
  protected propNames: string[] = ['width', 'length', 'area', 'measuredFactor']
  protected keyConversions: {} = {
    'factor': 'measuredFactor'
  }
}
