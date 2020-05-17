export default class PlayerScore {
  userId: string
  userName: string
  score: Number
  constructor(userId: string, userName: string, score: Number) {
    this.userId = userId
    this.userName = userName
    this.score = score
  }
}
