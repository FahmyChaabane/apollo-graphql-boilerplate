import { MongoDataSource } from "apollo-datasource-mongodb";

class Comments extends MongoDataSource {
  async getComments(filter = null) {
    console.log("context", this.context.headers.authorization);
    return filter
      ? await this.model.find({ content: new RegExp(`.*${filter}.*`, "i") })
      : await this.model.find({});
  }
}

export default Comments;
