export default class Songs {
  songId: string
  jirikiRank: string
  songName: string
  contributor: string
  instrument: string
  constructor(
    songId: string,
    jirikiRank: string,
    songName: string,
    contributor: string,
    instrument: string
  ) {
    this.songId = songId
    this.jirikiRank = jirikiRank
    this.songName = songName
    this.contributor = contributor
    this.instrument = instrument
  }
}
