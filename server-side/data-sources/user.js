import { MongoDataSource } from "apollo-datasource-mongodb";

class Users extends MongoDataSource {
  async getUsers(filter = null) {
    console.log("context", this.context.headers.authorization);
    return filter
      ? await this.model.find({ userName: new RegExp(`.*${filter}.*`, "i") })
      : await this.model.find({});
  }
}

export default Users;
