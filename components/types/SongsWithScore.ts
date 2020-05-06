import Songs from './Songs'

export default class SongsWithScore extends Songs {
  score: Number

  constructor(
    songId: string,
    jirikiRank: string,
    songName: string,
    contributor: string,
    instrument: string,
    score: Number,
    average: Number,
    max: Number
  ) {
    super(songId, jirikiRank, songName, contributor, instrument)
    this.score = score
  }
}
