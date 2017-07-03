import { Injectable } from '@angular/core';

import { ModelMeasurementService } from './model-measurement.service'
import { ModelGridService } from './model-grid.service'
import { PredictionsService } from './predictions.service'

import { CurrentSettingsService } from './current-settings.service'

@Injectable()
export class ModelDataService {
  protected propNames: string[] = ['measurement', 'model', 'predictions']
  public machineSettingsKey: string
  public measurement: ModelMeasurementService
  public model: ModelGridService
  public predictions: PredictionsService

  constructor() {
    this.measurement = new ModelMeasurementService()
    this.model = new ModelGridService()
    this.predictions = new PredictionsService()
  }

  fillFromObject(object: {}) {
    console.log('model.data ModelData fillFromObject')
    if (object == null) {
      for (let propName of this.propNames) {
        this[propName].reset()
      }
    }
    else {
      for (let propName of this.propNames) {
        if (object[propName] == null) {
          this[propName].reset()
        }
        else {
          this[propName].fillFromObject(object[propName])
        }
      }
    }
    this.measurement.initialLengthAreaUpdate()
    this.predictions.initialLengthAreaUpdate()
  }

  updateKey(currentSettings: CurrentSettingsService) {
    this.machineSettingsKey = currentSettings.returnKey()
  }

  exportLite(): ModelDataLite {
    console.log('model.data ModelData exportLite')
    let modelDataLite = <ModelDataLite>{
      machineSettingsKey: this.machineSettingsKey,
      measurement: {
        width: this.measurement.width,
        length: this.measurement.length,
        measuredFactor: this.measurement.measuredFactor
      },
      model: {
        width: this.model.width,
        length: this.model.length,
        predictedFactor: this.model.predictedFactor
      },
      predictions: {
        width: this.predictions.width,
        length: this.predictions.length,
        measuredFactor: this.predictions.measuredFactor,
        predictedFactor: this.predictions.predictedFactor
      }
    }
    return modelDataLite
  }
}

export interface ModelDataLite {
  machineSettingsKey: string
  measurement: {
    width: number[],
    length: number[],
    measuredFactor: number[]
  }
  model: {
    width: number[],
    length: number[],
    predictedFactor: number[]
  }
  predictions: {
    width: number[],
    length: number[],
    measuredFactor: number[],
    predictedFactor: number[]
  }
}
