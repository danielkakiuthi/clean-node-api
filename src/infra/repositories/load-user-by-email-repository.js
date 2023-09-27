// const { MongoClient } = require('mongodb')

// let client, db
module.exports = class LoadUserByEmailRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async load (email) {
    const user = await this.userModel.findOne(
      { email }, {
        projection: {
          password: 1
        }
      }
    )
    return user
  }
}
