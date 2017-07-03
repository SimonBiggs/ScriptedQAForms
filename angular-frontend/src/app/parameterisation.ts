import { Coordinates } from './coordinates'

export class Parameterisation {
  public id: number
  public width: number
  public length: number

  insert: Coordinates
  circle: Coordinates
  ellipse: Coordinates

  constructor() {
    this.insert = new Coordinates()
    this.circle = new Coordinates()
    this.ellipse = new Coordinates()
  }

  hash(input: string) {
    let hash = 0, i: number, chr: number, len: number
    if (input.length === 0) return hash
    for (i = 0, len = input.length; i < len; i++) {
      chr   = input.charCodeAt(i)
      hash  = ((hash << 5) - hash) + chr
      hash |= 0 // Convert to 32bit integer
    }
    return hash
  }

  insertUpdated() {
    if (this.insert != null) {
      this.id = this.hash(
        '{"x":' + JSON.stringify(this.insert.x) + ',' +
        '"y":' + JSON.stringify(this.insert.y) +
        '}')
    }
    else {
      throw new RangeError('Insert was not defined. Cannot run insert updated.')
    }

  }

  reset() {
    this.id = null

    for (let key of ['insert', 'circle', 'ellipse']) {
      this[key] = new Coordinates()
      this[key].x = [0]
      this[key].y = [0]
    }

    this.width = null
    this.length = null
  }
}