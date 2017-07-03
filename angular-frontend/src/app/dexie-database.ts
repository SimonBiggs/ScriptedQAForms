import Dexie from 'dexie'

import { Parameterisation } from './parameterisation'
import { InsertData } from './insert-data'

import { ModelDataService, ModelDataLite } from './model-data.service'
import { MachineSpecification} from './machine-specification'
import { CurrentSettingsService } from './current-settings.service'

export class PulledFromLocalStorage {
  id: number
  pulledFromLocalStorage: boolean
}

export class ServerURLs {
  purpose: string
  url: string
}

export class DexieDatabase extends Dexie {  
  pulledFromLocalStorage: Dexie.Table<PulledFromLocalStorage, number>
  modelData: Dexie.Table<ModelDataLite, string>
  specifications: Dexie.Table<MachineSpecification, string>
  currentSettings: Dexie.Table<CurrentSettingsService, number>
  parameterisationCache: Dexie.Table<Parameterisation, number>
  currentInsertData: Dexie.Table<InsertData, number>
  serverURLs: Dexie.Table<ServerURLs, string>
  dicomInsertList: Dexie.Table<InsertData, number>

  constructor() {
    super("DefaultDatabase")

    this.version(1).stores({
      specifications: 'machine, makeAndModel, energy, R50, applicator, ssd',
      currentSettings: 'id, machine, energy, applicator, ssd',
      currentInsertData: 'id, machine, parameterisation, energy, applicator, ssd, measuredFactor',      
      modelData: 'machineSettingsKey, measurement, model, predictions',
      dicomInsertList: 'id, machine, parameterisation, energy, applicator, ssd, measuredFactor',
      serverURLs: 'purpose, url',
      parameterisationCache: 'id, insert, width, length, circle, ellipse',
      pulledFromLocalStorage: 'id, pulledFromLocalStorage'
    })

    this.pulledFromLocalStorage.mapToClass(PulledFromLocalStorage)
    this.modelData.mapToClass(ModelDataService)
    this.specifications.mapToClass(MachineSpecification)
    this.currentSettings.mapToClass(CurrentSettingsService)
    this.parameterisationCache.mapToClass(Parameterisation)
    this.currentInsertData.mapToClass(InsertData)
    this.serverURLs.mapToClass(ServerURLs)
    this.dicomInsertList.mapToClass(InsertData)
  }
}

export let myDexieDatabase = new DexieDatabase()
