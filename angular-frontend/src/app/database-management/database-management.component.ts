import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { myDexieDatabase } from '../dexie-database';

import { TitleService } from '../title.service';
import { DataPersistenceService } from '../data-persistence.service';

@Component({
  selector: 'app-database-management',
  templateUrl: './database-management.component.html',
  styleUrls: ['./database-management.component.css']
})
export class DatabaseManagementComponent implements OnInit {

  tempSaveOfDatabaseDump: string
  databaseDump: string
  reader = new FileReader()
  fileJsonObject: {}

  emptyDataBaseString = `{
  "databaseDetails": {
    "name": "DefaultDatabase",
    "version": 1,
    "schema": {
      "specifications": "machine, makeAndModel, energy, R50, applicator, ssd",
      "currentSettings": "id, machine, energy, applicator, ssd",
      "currentInsertData": "id, machine, parameterisation, energy, applicator, ssd, measuredFactor",
      "modelData": "machineSettingsKey, measurement, model, predictions",
      "dicomInsertList": "id, machine, parameterisation, energy, applicator, ssd, measuredFactor",
      "serverURLs": "purpose, url",
      "parameterisationCache": "id, insert, width, length, circle, ellipse",
      "pulledFromLocalStorage": "id, pulledFromLocalStorage"
    }
  },
  "databaseContents": {
    "specifications": [],
    "currentSettings": [],
    "currentInsertData": [],
    "modelData": [],
    "dicomInsertList": [],
    "serverURLs": [],
    "parameterisationCache": [],
    "pulledFromLocalStorage": [
      {
        "id": 0,
        "pulledFromLocalStorage": true
      }
    ]
  }
}`

  constructor(
    private myTitleService: TitleService,
    private dataPersistenceService: DataPersistenceService,
  ) {
    this.reader.onload = (event: any) => {
      console.log('storage-management.component this.reader.onload')
      let contents = event.target.result
      this.fileJsonObject = JSON.parse(contents)
    }
  }

  @ViewChild('jsonCodeDisplay') jsonCodeDisplay: any

  ngOnInit() {
    console.log('storage-management.component ngOnInit')
    this.myTitleService.set('Database management')

    this.dataPersistenceService.databaseDump()
    .then((stringDump: string) => {
      this.databaseDump = stringDump
    })
  }

  exportDataBase() {
    console.log('storage-management.component exportDataBase')
    this.dataPersistenceService.databaseDump()
    .then((stringDump: string) => {
      this.databaseDump = stringDump
      let element = document.createElement('a')
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(stringDump))
      element.setAttribute('download', 'databaseDump.json')

      element.style.display = 'none'
      document.body.appendChild(element)

      element.click()

      document.body.removeChild(element)
    })
  }

  openFile(event: any) {
    console.log('storage-management.component openFile')
    if (typeof event.target !== 'undefined') {
      let file = event.target.files[0]
      if (file) {
        this.reader.readAsText(file)
      }      
    }
    else {
      console.log(event);
    }
  }
  
  appendJsonToDatabase(jsonObject: {}) {
    this.dataPersistenceService.appendJsonToDatabase(jsonObject)
    .then(() => {
      return this.dataPersistenceService.databaseDump()
    })
    .then((stringDump: string) => {
      this.databaseDump = stringDump
      this.fileJsonObject = null
    })
  }

  emptyDatabase() {
    this.dataPersistenceService.databaseDump()
    .then((stringDump: string) => {
      this.tempSaveOfDatabaseDump = stringDump
      return this.dataPersistenceService.emptyDatabase()
    })
    .then(() => {
      return this.dataPersistenceService.databaseDump()
    })
    .then((stringDump: string) => {
      this.databaseDump = stringDump
    })
  }

  undoDataEmpty() {    
    this.appendJsonToDatabase(JSON.parse(this.tempSaveOfDatabaseDump))
  }
}
