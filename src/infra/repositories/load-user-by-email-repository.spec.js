/* eslint-env jest */
const MongoHelper = require('../helpers/mongo-helper.js')
const LoadUserByEmailRepository = require('./load-user-by-email-repository.js')
const MissingParamError = require('../../utils/errors/missing-param-error.js')
let userModel

const makeSut = () => {
  return new LoadUserByEmailRepository()
}

describe('LoadUserByEmail Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    userModel = await MongoHelper.getCollection('users')
  })

  beforeEach(async () => {
    await userModel.deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return null if no user is found', async () => {
    const sut = makeSut()
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeNull()
  })

  test('Should return an user if user is found', async () => {
    const sut = makeSut()
    const fakeUser = {
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    }
    const responseUser = await userModel.insertOne(fakeUser)
    const user = await sut.load(fakeUser.email)
    expect(user).toEqual({
      _id: responseUser.insertedId,
      password: fakeUser.password
    })
  })

  test('Should throw if no email is provided', async () => {
    const sut = makeSut()
    const promise = sut.load()
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })
})
