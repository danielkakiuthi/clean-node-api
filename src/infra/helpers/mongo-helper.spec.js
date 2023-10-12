/* eslint-env jest */
const sut = require('./mongo-helper')

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('should return collection', async () => {
    expect(sut.db).toBeTruthy()
    expect(sut.getCollection('users'))
  })
})
