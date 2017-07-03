import { Parameterisation } from './parameterisation'

export class InsertData {
  public id: number
  public machine: string
  public energy: number
  public applicator: string
  public ssd: number
  public measuredFactor: number

  public parameterisation: Parameterisation

  constructor(inputId?: number) {
    this.parameterisation = new Parameterisation()
    if (inputId != null) {
      this.id = inputId
    }
    else {
      this.id = 0
    }    
  }

  reset() {
    this.machine = null
    this.parameterisation.reset()
    this.energy = null
    this.applicator = null
    this.ssd = null
    this.measuredFactor = null
  }

  fillFromObject(object: {}) {
    if (object == null) {
      this.reset()
    }
    else {
      for (let key of ['machine', 'energy', 'applicator', 'ssd', 'measuredFactor']) {
        this[key] = object[key]
      }
      this.parameterisation.insert = object['parameterisation'].insert
      this.parameterisation.insertUpdated()
      this.parameterisation.circle = object['parameterisation'].circle
      this.parameterisation.ellipse = object['parameterisation'].ellipse
      this.parameterisation.width = object['parameterisation'].width
      this.parameterisation.length = object['parameterisation'].length
    }
  }
}
