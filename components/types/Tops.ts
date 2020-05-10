import PlayerScore from './PlayerScore'

export default class Tops {
  top: PlayerScore
  second: PlayerScore
  third: PlayerScore
  constructor(top: PlayerScore, second: PlayerScore, third: PlayerScore) {
    this.top = top
    this.second = second
    this.third = third
  }
}
