import { MongoDataSource } from "apollo-datasource-mongodb";

class Posts extends MongoDataSource {
  async getPosts(filter = null) {
    console.log("context", this.context.headers.authorization);
    return filter
      ? await this.model.find({ content: new RegExp(`.*${filter}.*`, "i") })
      : await this.model.find({});
  }

  async addPost(data = {}) {
    console.log("context", this.context.headers.authorization);
    const post = new this.model({
      ...data,
    });
    return await post.save();
  }

  async updatePost(_id, data) {
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

  async removePost(_id) {
    return await this.model.findOneAndRemove(
      { _id },
      { useFindAndModify: false } // for deprication stuffs
    );
  }

  async getToBeDeletedPosts(author) {
    return await this.model.find({ author });
  }
  /*
  async removePostsAssociatedToUser(author) {
    await this.model.deleteOne({ author });
  }*/

  async getAllPostOfUser(author) {
    return await this.model.find({ author });
  }

  async getPostOfComment(_id) {
    return await this.model.findOne({ _id });
  }
}

export default Posts;
