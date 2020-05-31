import Stats from './Stats'

export default class StatsWithJiriki {
  jirikiRank: string
  stats: Stats
  constructor(
    gold: number,
    silver: number,
    bronze: number,
    blue: number,
    gray: number,
    none: number,
    jirikiRank: string
  ) {
    this.stats = new Stats(gold, silver, bronze, blue, gray, none)
    this.jirikiRank = jirikiRank
  }
}
