import { MongoDataSource } from "apollo-datasource-mongodb";

class Posts extends MongoDataSource {
  async getPosts(filter) {
    const { role, _id: author } = this.context.user;
    if (role === "ADMIN")
      return filter
        ? await this.model
            .find({ content: new RegExp(`.*${filter}.*`, "i") })
            .sort({ createdAt: -1 })
        : await this.model.find({}).sort({ createdAt: -1 });
    else
      return filter
        ? await this.model
            .find({
              content: new RegExp(`.*${filter}.*`, "i"),
              author,
            })
            .sort({ createdAt: -1 })
        : await this.model.find({ author }).sort({ createdAt: -1 });
  }

  async addPost(data = {}) {
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
