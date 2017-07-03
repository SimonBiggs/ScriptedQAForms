import { Injectable } from '@angular/core';

import { BaseData } from './base-data'

@Injectable()
export class AreaLengthConversionService extends BaseData {
  public width: number[] = []
  public length: number[] = []
  public area: number[] = []
  public measuredFactor: number[] = []

  convertLengthToArea(width: number, length: number): number {
    console.log('model.data AreaLengthConversion convertLengthToArea')
    let area = Math.PI * width * length / 4
    return Math.round(area*10)/10
  }

  convertAreaToLength(width: number, area: number): number {
    console.log('model.data AreaLengthConversion convertAreaToLength')
    let length = 4 * area / (Math.PI * width)
    return Math.round(length*10)/10
  }

  updateAreaFromLength() {
    console.log('model.data AreaLengthConversion updateAreaFromLength')
    let width: number
    let length: number
    let area: number

    this.area = []

    for (let i in this.length) {
      width = this.width[i]
      length = this.length[i]

      area = this.convertLengthToArea(width, length)
      this.area.push(area)
    }
  }

  updateLengthFromArea() {
    console.log('model.data AreaLengthConversion updateLengthFromArea')
    let width: number
    let length: number
    let area: number

    this.length = []

    for (let i in this.area) {
      width = this.width[i]
      area = this.area[i]

      length = this.convertAreaToLength(width, area)
      this.length.push(length)
    }
  }

  initialLengthAreaUpdate() {
    console.log('model.data AreaLengthConversion initialLengthAreaUpdate')
    if (this.length.length < this.area.length) {
      this.updateLengthFromArea()
    }
    else {
      this.updateAreaFromLength()
    }
  }
}