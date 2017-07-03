import { Injectable } from '@angular/core';

import { AreaLengthConversionService } from './area-length-conversion.service'

@Injectable()
export class PredictionsService extends AreaLengthConversionService {
  protected propNames: string[] = ['width', 'length', 'area', 'measuredFactor', 'predictedFactor']
  public predictedFactor: number[] = []
}