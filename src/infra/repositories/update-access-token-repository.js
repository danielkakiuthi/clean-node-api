const MissingParamError = require('../../utils/errors/missing-param-error.js')
const MongoHelper = require('../helpers/mongo-helper.js')

module.exports = class UpdateAccessTokenRepository {
  async update (userId, accessToken) {
    if (!userId) {
      throw new MissingParamError('userId')
    }
    if (!accessToken) {
      throw new MissingParamError('accessToken')
    }
    const db = MongoHelper.db
    await db.collection('users').updateOne({ _id: userId }, { $set: { accessToken } })
  }
}
