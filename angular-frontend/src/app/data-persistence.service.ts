import { Injectable } from '@angular/core';

import { Coordinates } from './coordinates';
import { Parameterisation } from './parameterisation';
import { InsertData } from './insert-data'
import { MachineSpecification } from './machine-specification'

import { myDexieDatabase, PulledFromLocalStorage, ServerURLs } from './dexie-database'

import { ModelDataService, ModelDataLite } from './model-data.service';
import { CurrentSettingsService } from './current-settings.service';

@Injectable()
export class DataPersistenceService {

  loadCurrentSettings() {
    console.log('data-persistence.service loadCurrentSettings')
    let currentSettings = new CurrentSettingsService()
    return myDexieDatabase.currentSettings.toArray()
    .then((result: CurrentSettingsService[]) => {
      console.log('data-persistence.service loadCurrentSettings db.currentSettings.toArray() promise complete')
      if (result.length == 0) {
        for (let key of ['machine', 'energy', 'applicator', 'ssd']) {
          currentSettings[key] = null
        }
      }
      else {
        currentSettings = result[0]
      }
      return currentSettings
    })
  }

  saveCurrentSettings(currentSettings: CurrentSettingsService) {
    console.log('data-persistence.service saveCurrentSettings')
    return myDexieDatabase.currentSettings.put(currentSettings)
    .then(() => {
      console.log('data-persistence.service saveCurrentSettings db.currentSettings.put(currentSettings) promise complete')
    })
  }

  loadSpecificationsData() {
    console.log('data-persistence.service loadSpecificationsData')
    return myDexieDatabase.specifications.toArray()
    .then((result: MachineSpecification[]): MachineSpecification[] => {
      console.log('data-persistence.service loadSpecificationsData db.specifications.toArray() promise complete')
      return result
    })
  }

  saveSpecificationsData(specification: MachineSpecification) {
    console.log('data-persistence.service saveSpecificationsData')
    return myDexieDatabase.specifications.put(specification)
    .then(() => {
      console.log("data-persistence.service saveSpecificationsData db.specifications.put(specification) promise complete")
    })
  }

  loadModelData(modelData: ModelDataService, currentSettings: CurrentSettingsService) {
    console.log('data-persistence.service loadModelData')
    let storageKey = currentSettings.returnKey()
    modelData.machineSettingsKey = storageKey

    return myDexieDatabase.modelData.get(storageKey)
    .then((result: ModelDataLite) => {
      console.log("data-persistence.service loadModelData db.modelData.get(storageKey) promise complete")
      if (result == null) {
        modelData.fillFromObject({})
      }
      else {
        modelData.fillFromObject(result)
      }
    })
  }

  saveModelData(modelData: ModelDataService, currentSettings: CurrentSettingsService) {
    console.log('data-persistence.service saveModelData')
    let storageKey = currentSettings.returnKey()
    modelData.machineSettingsKey = storageKey

    let modelDataLite = modelData.exportLite()

    return myDexieDatabase.modelData.put(modelDataLite)
    .then(() => {
      console.log("data-persistence.service loadModelData db.modelData.put(modelDataLite) promise complete")
    })
  }

  loadParameterisationCache(parameterisation: Parameterisation) {
    console.log('data-persistence.service loadParameterisationCache')

    return myDexieDatabase.parameterisationCache.get(parameterisation.id)
    .then((result: Parameterisation) => {
      console.log("data-persistence.service loadParameterisationCache db.parameterisationCache.get(parameterisation.parameterisationKey) promise complete")
      if (result == null) {
        for (let key of ['width', 'length', 'circle', 'ellipse']) {
          parameterisation[key] = null
        }
      }
      else {
        for (let key of ['width', 'length', 'circle', 'ellipse']) {
          parameterisation[key] = result[key]
        }
      }
    })
  }

  saveParameterisationCache(parameterisation: Parameterisation) {
    console.log('data-persistence.service saveParameterisationCache')
    return myDexieDatabase.parameterisationCache.put(parameterisation)
    .then(() => {
      console.log("data-persistence.service saveParameterisationCache db.parameterisationCache.put(parameterisation) promise complete")
    })
  }

  loadCurrentInsertData(insertData: InsertData) {
    console.log('data-persistence.service loadCurrentInsertData')
    // This is required because the coodinate inputs to the text boxes are not using ngModel.
    // This work around is brittle.
    let insert = insertData.parameterisation.insert

    return myDexieDatabase.currentInsertData.get(0)
    .then((result: InsertData) => {
      if (result == null) {
        insertData.reset()
      }
      else {
        insert.x = result.parameterisation.insert.x
        insert.y = result.parameterisation.insert.y

        insertData.fillFromObject(result)
      }

      insertData.parameterisation.insert = insert
    })
  }

  saveCurrentInsertData(insertData: InsertData) {
    console.log('data-persistence.service saveCurrentInsertData')

    return myDexieDatabase.currentInsertData.put(insertData)
    .then(() => {
      console.log("data-persistence.service saveCurrentInsertData db.currentInsertData.put(insertData)) promise complete")
    })
  }

  loadServerUrl(purpose: string) {
    console.log('data-persistence.service loadServerUrl')

    return myDexieDatabase.serverURLs.get(purpose)
  }

  saveServerUrl(purpose:string, url: string) {
    console.log('data-persistence.service saveServerUrl')
    let serverUrl = new ServerURLs()
    serverUrl.purpose = purpose
    serverUrl.url = url

    return myDexieDatabase.serverURLs.put(serverUrl)
  }
  
  loadDicomInsertList() {
    console.log('data-persistence.service loadDicomInsertList')

    return myDexieDatabase.dicomInsertList.toArray()
    .then((result: InsertData[]): InsertData[] => {
      console.log('data-persistence.service loadDicomInsertList db.dicomInsertList.toArray() promise complete')
      for (let insertData of result) {
        let parameterisation = new Parameterisation()
        parameterisation.insert = insertData.parameterisation.insert
        parameterisation.insertUpdated()
        insertData.parameterisation = parameterisation
        this.loadParameterisationCache(insertData.parameterisation)
      }
      return result
    })
  }

  saveDicomInsertList(insertList: InsertData[]) {
    console.log('data-persistence.service saveDicomInsertList')
    return myDexieDatabase.dicomInsertList.bulkPut(insertList)
    .then(() => {
      console.log('data-persistence.service saveDicomInsertList db.dicomInsertList.bulkPut(insertList) promise complete')
    })
  }

  jsonTransform(input: {}): string {
    console.log('data-persistence.service jsonTransform')
    let jsonText = JSON.stringify(input, null, 2)
    jsonText = jsonText.replace(/,\s*(-?\d+(\.\d+)?)/g, ", $1");
    jsonText = jsonText.replace(/\n/g, "\n  ");

    return jsonText
  }

  databaseDump() {
    console.log('data-persistence.service databaseDump')
    let schemaString = ""
    let tablesString = ""
    let tableDumps: {} = {}
    let stringDump = ""
    let promiseList: any[] = []

    myDexieDatabase.tables.forEach((table, i) => {
      let primKeyAndIndexes = [table.schema.primKey].concat(table.schema.indexes)
      let schemaSyntax = primKeyAndIndexes.map(function (index) { return index.src; }).join(', ')
      schemaString = schemaString.concat(`
` + "      \"" + table.name + "\": " + "\"" +
        schemaSyntax + "\"" + (i < myDexieDatabase.tables.length - 1 ? "," : ""))

      tableDumps[table.name] = {}
      promiseList.push(table.toArray((objectArray) => {
        tableDumps[table.name] = objectArray
      }))
    })

    return Promise.all(promiseList)
    .then(() => {
        stringDump = `{
  "databaseDetails": {
    "name": "` + myDexieDatabase.name +`",
    "version": ` + myDexieDatabase.verno + `,
    "schema": {` + schemaString + `
    }
  },
  "databaseContents": ` + this.jsonTransform(tableDumps) + `
}`
        return stringDump
      })
  }

  emptyDatabase() {
    console.log('data-persistence.service emptyDatabase')
    let promiseList: any[] = []
    let pulledFromLocalStorage: PulledFromLocalStorage
    myDexieDatabase.tables.forEach((table, i) => {
      promiseList.push(table.clear())
    })

    return Promise.all(promiseList)
    .then(() => {
      pulledFromLocalStorage = {
        id: 0,
        pulledFromLocalStorage: true
      }
      return myDexieDatabase.pulledFromLocalStorage.add(pulledFromLocalStorage)
    })
  }

  appendJsonToDatabase(object: {}) {
    console.log('data-persistence.service appendJsonToDatabase')
    let promiseList: any[] = []
    let databaseContents = object['databaseContents']
    myDexieDatabase.tables.forEach((table, i) => {
      promiseList.push(table.bulkPut(databaseContents[table.name]))
    })
    return Promise.all(promiseList)
  }
}