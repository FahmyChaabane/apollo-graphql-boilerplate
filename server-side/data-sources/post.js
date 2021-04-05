import { MongoDataSource } from "apollo-datasource-mongodb";

class Posts extends MongoDataSource {
  async getPosts(filter = null) {
    console.log("context", this.context.headers.authorization);
    return filter
      ? await this.model.find({ content: new RegExp(`.*${filter}.*`, "i") })
      : await this.model.find({});
  }
}

export default Posts;
