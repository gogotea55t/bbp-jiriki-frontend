import Stats from './Stats'

export default class StatsWithJiriki extends Stats {
  jirikiRank: string
  constructor(
    gold: number,
    silver: number,
    bronze: number,
    blue: number,
    gray: number,
    none: number,
    jirikiRank: string
  ) {
    super(gold, silver, bronze, blue, gray, none)
    this.jirikiRank = jirikiRank
  }
}
