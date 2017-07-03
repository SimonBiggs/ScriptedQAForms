export class MachineSpecification {
  machine: string
  makeAndModel: string
  energy: number[]
  R50: number[]
  applicator: string[]
  ssd: number[]

  constructor() {
    this.machine = ""
    this.makeAndModel = ""
    this.energy = []
    this.R50 = []
    this.applicator = []
    this.ssd = []
  }
}