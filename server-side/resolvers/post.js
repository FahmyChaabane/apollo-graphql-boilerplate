import * as VDocExist from "../utils/validateDocumentExistence";
import validateId from "../utils/validateMongodbId";
import { UserInputError } from "apollo-server-express";

export default {
  Query: {
    posts(_, args, ctx, profile) {
      return ctx.dataSources.posts.getPosts(args.query);
    },
    post(_, args, ctx, profile) {
      return ctx.dataSources.posts.getPost(args.id);
    },
  },
  Mutation: {
    createPost: async (_, { data }, ctx) => {
      const match = validateId(data.author);
      if (!match) throw new UserInputError("Invalid ID argument value!");
      await VDocExist.validateUserDocumentExistence(data.author);

      return ctx.dataSources.posts.addPost(data);
    },
    updatePost: async (_, { id, data }, ctx) => {
      const match = validateId(id);
      if (!match) throw new UserInputError("Invalid ID argument value!");
      await VDocExist.validatePostDocumentExistence(id);

      return ctx.dataSources.posts.updatePost(id, data);
    },
    removePost: async (_, { id }, ctx) => {
      const match = validateId(id);
      if (!match) throw new UserInputError("Invalid ID argument value!");
      await VDocExist.validatePostDocumentExistence(id);

      const post = await ctx.dataSources.posts.removePost(id);
      await ctx.dataSources.comments.removeCommentsAssociatedToPost(post._id);
      return post;
    },
  },
  Post: {
    author(parent, _, ctx) {
      return ctx.dataSources.users.getAuthorOfPost(parent.author);
    },
    comments(parent, _, ctx) {
      return ctx.dataSources.comments.getAllCommentOfPost(parent._id);
    },
  },
};
