import { Component, OnInit } from '@angular/core';

import { TitleService } from '../title.service';
import { CurrentSettingsService } from '../current-settings.service';
import { DataPersistenceService } from '../data-persistence.service';
import { MachineSpecificationService } from '../machine-specification.service';

@Component({
  selector: 'app-specifications',
  templateUrl: './specifications.component.html',
  styleUrls: ['./specifications.component.css']
})
export class SpecificationsComponent implements OnInit {
  newMachineID: string;
  newMachineIDValid: boolean = false;
  newModel: string;

  newEnergy: number;
  newEnergyValid: boolean = false;
  newR50: number;

  newApplicator: string;
  newApplicatorValid: boolean = false;

  newSSD: number;
  newSSDValid: boolean = false;

  currentSettings: CurrentSettingsService

  constructor(
    private myTitleService: TitleService,
    private dataPersistenceService: DataPersistenceService,
    public machineSpecificationService: MachineSpecificationService
  ) {}


  ngOnInit() {
    console.log('specifications.component ngOnInit')
    this.myTitleService.set('Machine Specifications');
    this.machineSpecificationService.loadData()
      .then(() => {
        console.log('specifications.component ngOnInit this.machineSpecificationService.loadData() promise complete')
        this.currentSettings = this.machineSpecificationService.currentSettings
      })
  }

  checkNewMachineIDInput() {
    console.log('specifications.component checkNewMachineIDInput')
    if (
      this.machineSpecificationService.machineList.indexOf(this.newMachineID) == -1 && 
      this.newMachineID != null && this.newMachineID != ""
    ) {
      this.newMachineIDValid = true;
    }
    else {
      this.newMachineIDValid = false;
    }
  }

  addMachineID() {
    console.log('specifications.component addMachineID')
    this.checkNewMachineIDInput()
    if (!this.newMachineIDValid) {
      throw new RangeError('The new machine being added is not a valid input')
    }
    if (this.newModel == "" || this.newModel == null) {
      this.newModel = ""
    }

    this.machineSpecificationService.newMachine(this.newMachineID, this.newModel)

    this.newMachineID = null
    this.newModel = null
    this.newMachineIDValid = false

    this.dataPersistenceService.saveSpecificationsData(this.machineSpecificationService.currentSpecification)
  }

  checkNewEnergyInput() {
    console.log('specifications.component checkNewEnergyInput')
    if (
      this.machineSpecificationService.currentSpecification.energy.indexOf(Number(this.newEnergy)) < 0 && 
      this.newEnergy != null && !isNaN(Number(this.newEnergy))
    ) {
      this.newEnergyValid = true;
    }
    else {
      this.newEnergyValid = false;
    }
  }

  addEnergy() {
    console.log('specifications.component addEnergy')
    this.checkNewEnergyInput()
    if (!this.newEnergyValid) {
      throw new RangeError('The new energy set being added is not valid')
    }
    
    let R50 = Number(this.newR50)

    if (this.newR50 === undefined || this.newR50 === null) {
      R50 = NaN
    }

    this.machineSpecificationService.currentSpecification.energy.push(Number(this.newEnergy))
    this.machineSpecificationService.currentSpecification.R50.push(R50)

    this.newEnergy = null
    this.newR50 = null
    this.newEnergyValid = false

    this.dataPersistenceService.saveSpecificationsData(this.machineSpecificationService.currentSpecification)
  }

  checkNewApplicatorInput() {
    console.log('specifications.component checkNewApplicatorInput')
    if (
      this.machineSpecificationService.currentSpecification.applicator.indexOf(this.newApplicator.toLowerCase()) < 0 && 
      this.newApplicator != null && this.newApplicator != ""
    ) {
      this.newApplicatorValid = true
    }
    else {
      this.newApplicatorValid = false
    }
  }

  addApplicator() {
    console.log('specifications.component addApplicator')

    this.checkNewApplicatorInput()

    if (!this.newApplicatorValid) {
      throw new RangeError('The new applicator being added is not valid')
    }
    this.machineSpecificationService.currentSpecification.applicator.push(this.newApplicator.toLowerCase())

    this.newApplicator = null
    this.newApplicatorValid = false

    this.dataPersistenceService.saveSpecificationsData(this.machineSpecificationService.currentSpecification)
  }

  checkNewSSDInput() {
    console.log('specifications.component checkNewSSDInput')
    if (
      this.machineSpecificationService.currentSpecification.ssd.indexOf(Number(this.newSSD)) < 0 && 
      this.newSSD != null && !isNaN(Number(this.newSSD))
    ) {
      this.newSSDValid = true;
    }
    else {
      this.newSSDValid = false;
    }
  }

  addSSD() {
    console.log('specifications.component addSSD')

    this.checkNewSSDInput()

    if (!this.newSSDValid) {
      throw new RangeError('The new ssd being added is not valid')
    }
    if (this.newSSDValid) {
    this.machineSpecificationService.currentSpecification.ssd.push(Number(this.newSSD))

    this.newSSD = null
    this.newSSDValid = false

    this.dataPersistenceService.saveSpecificationsData(this.machineSpecificationService.currentSpecification)
    }
  }
}
