import * as VDocExist from "../utils/validateDocumentExistence";
import validateId from "../utils/validateMongodbId";
import { UserInputError } from "apollo-server-express";

export default {
  Query: {
    comments(_, args, ctx, profile) {
      return ctx.dataSources.comments.getComments(args.query);
    },
  },
  Mutation: {
    createComment: async (_, { data }, ctx) => {
      const matchA = validateId(data.author);
      const matchP = validateId(data.post);
      if (!matchA || !matchP)
        throw new UserInputError("Invalid ID argument value!");
      await VDocExist.validateUserDocumentExistence(data.author);
      await VDocExist.validatePostDocumentExistence(data.post);

      return ctx.dataSources.comments.addComment(data);
    },
    updateComment: async (_, { id, data }, ctx) => {
      const match = validateId(id);
      if (!match) throw new UserInputError("Invalid ID argument value!");
      await VDocExist.validateCommentDocumentExistence(id);

      return ctx.dataSources.comments.updateComment(id, data);
    },
    removeComment: async (_, { id }, ctx) => {
      const match = validateId(id);
      if (!match) throw new UserInputError("Invalid ID argument value!");
      await VDocExist.validateCommentDocumentExistence(id);

      return ctx.dataSources.comments.removeComment(id);
    },
  },
  Comment: {
    author(parent, _, ctx) {
      return ctx.dataSources.users.getAuthorOfComment(parent.author);
    },
    post(parent, _, ctx) {
      return ctx.dataSources.posts.getPostOfComment(parent.post);
    },
  },
};
