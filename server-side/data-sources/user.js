import { MongoDataSource } from "apollo-datasource-mongodb";
class Users extends MongoDataSource {
  async getUsers(filter = null) {
    //console.log("context", this.context.headers.authorization);
    return filter
      ? await this.model.find({ userName: new RegExp(`.*${filter}.*`, "i") })
      : await this.model.find({});
  }
  async getUser(_id) {
    return await this.model.findOne({ _id });
  }

  async updateUser(_id, data) {
    return await this.model.findOneAndUpdate(
      { _id },
      {
        $set: data,
      },
      {
        new: true,
        useFindAndModify: false, // for deprecation stuffs
      }
    );
  }

  async removeUser(_id) {
    return await this.model.findOneAndRemove(
      { _id },
      { useFindAndModify: false } // for deprication stuffs
    );
  }

  async getAuthorOfPost(_id) {
    return await this.model.findOne({ _id });
  }

  async getAuthorOfComment(_id) {
    return await this.model.findOne({ _id });
  }
}

export default Users;
