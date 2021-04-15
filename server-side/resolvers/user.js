import async from "async";
import * as VDocExist from "../utils/validateDocumentExistence";
import validateId from "../utils/validateMongodbId";
import { UserInputError } from "apollo-server-express";

export default {
  Query: {
    users(_, args, ctx, profile) {
      return ctx.dataSources.users.getUsers(args.query);
    },
    user(_, args, ctx, profile) {
      return ctx.dataSources.users.getUser(args.id);
    },
  },
  Mutation: {
    updateUser: async (_, { id, data }, ctx) => {
      const match = validateId(id);
      if (!match) throw new UserInputError("Invalid ID argument value!");
      await VDocExist.validateUserDocumentExistence(id);

      return ctx.dataSources.users.updateUser(id, data);
    },
    removeUser: async (_, { id }, ctx) => {
      const match = validateId(id);
      if (!match) throw new UserInputError("Invalid ID argument value!");
      await VDocExist.validateUserDocumentExistence(id);

      const user = await ctx.dataSources.users.removeUser(id);
      const posts = await ctx.dataSources.posts.getToBeDeletedPosts(user._id);
      async.each(
        //https://stackoverflow.com/questions/31662783/mongoose-find-and-remove
        posts,
        (post, callback) => {
          ctx.dataSources.posts.removePost(post._id);
          ctx.dataSources.comments.removeCommentsAssociatedToPost(post._id);
          callback();
        },
        (err) => {
          if (err) console.log("operation failed");
          else console.log("operation success!");
        }
      );
      await ctx.dataSources.comments.removeCommentsAssociatedToUser(user._id);
      return user;
    },
  },
  User: {
    posts(parent, _, ctx) {
      return ctx.dataSources.posts.getAllPostOfUser(parent._id);
    },
    comments(parent, _, ctx) {
      return ctx.dataSources.comments.getAllCommentOfUser(parent._id);
    },
  },
};
