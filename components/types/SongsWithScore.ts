import Songs from './Songs'

export default class SongsWithScore extends Songs {
  score: Number
  max: Number
  average: Number

  constructor(
    songId: string,
    jirikiRank: string,
    songName: string,
    contributor: string,
    instrument: string,
    score: Number,
    max: Number,
    average: Number
  ) {
    super(songId, jirikiRank, songName, contributor, instrument)
    this.score = score
    this.max = max
    this.average = average
  }
}
