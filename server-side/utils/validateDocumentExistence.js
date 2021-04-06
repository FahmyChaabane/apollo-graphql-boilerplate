import { User } from "../models/user";
import { Post } from "../models/post";
import { Comment } from "../models/comment";
import { UserInputError } from "apollo-server-express";

export const validateUserDocumentExistence = async (_id) => {
  const user = await User.findOne({ _id });
  if (!user) throw new UserInputError("User not found!");
};

export const validatePostDocumentExistence = async (_id) => {
  const post = await Post.findOne({ _id });
  if (!post) throw new UserInputError("Post not found!");
};

export const validateCommentDocumentExistence = async (_id) => {
  const comment = await Comment.findOne({ _id });
  if (!comment) throw new UserInputError("Comment not found!");
};

export default {
  validateUserDocumentExistence,
  validatePostDocumentExistence,
  validateCommentDocumentExistence,
};
