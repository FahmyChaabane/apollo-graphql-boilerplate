import { MongoDataSource } from "apollo-datasource-mongodb";

class Comments extends MongoDataSource {
  async getComments(filter = null) {
    return filter
      ? await this.model.find({ content: new RegExp(`.*${filter}.*`, "i") })
      : await this.model.find({});
  }

  async addComment(data = {}) {
    const comment = new this.model({
      ...data,
    });
    return await comment.save();
  }

  async updateComment(_id, data) {
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

  async removeComment(_id) {
    return await this.model.findOneAndRemove(
      { _id },
      { useFindAndModify: false } // for deprication stuffs
    );
  }

  async removeCommentsAssociatedToPost(post) {
    await this.model.deleteMany({ post });
  }

  async removeCommentsAssociatedToUser(author) {
    await this.model.deleteMany({ author });
  }

  async getAllCommentOfUser(author) {
    return await this.model.find({ author });
  }

  async getAllCommentOfPost(postId) {
    return await this.model.find({ post: postId });
  }
}

export default Comments;
