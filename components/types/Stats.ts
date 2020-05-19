export default class Stats {
  gold: number
  silver: number
  bronze: number
  blue: number
  gray: number
  none: number

  constructor(
    gold: number,
    silver: number,
    bronze: number,
    blue: number,
    gray: number,
    none: number
  ) {
    this.gold = gold
    this.silver = silver
    this.bronze = bronze
    this.blue = blue
    this.gray = gray
    this.none = none
  }
}
