import Stats from '../Stats'

describe(Stats, () => {
  it('オブジェクトが生成できる', () => {
    const stats = new Stats(1, 2, 3, 4, 5, 6)
    expect(stats.gold).toBe(1)
    expect(stats.silver).toBe(2)
    expect(stats.bronze).toBe(3)
    expect(stats.blue).toBe(4)
    expect(stats.gray).toBe(5)
    expect(stats.none).toBe(6)
  })
})
