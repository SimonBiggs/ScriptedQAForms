import { Injectable } from '@angular/core';

import { BaseData } from './base-data'

@Injectable()
export class ModelGridService extends BaseData {
  protected propNames: string[] = ['width', 'length', 'predictedFactor']
  protected keyConversions: {} = {
    'factor': 'predictedFactor'
  }
  public width: number[] = []
  public length: number[] = []
  public predictedFactor: number[] = []
}

