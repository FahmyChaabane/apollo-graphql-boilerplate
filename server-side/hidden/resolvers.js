/* left for ref */

// import async from "async";
// import * as VDocExist from "../utils/validateDocumentExistence";
// import validateId from "../utils/validateMongodbId";
// import { UserInputError } from "apollo-server-express";

// export default {
//   Query: {
//     users(_, args, ctx, profile) {
//       return ctx.dataSources.users.getUsers(args.query);
//     },
//     posts(_, args, ctx, profile) {
//       // console.log("ctx", ctx.headers.authorization);
//       // console.log("args", args);

//       return ctx.dataSources.posts.getPosts(args.query);
//     },
//     comments(_, args, ctx, profile) {
//       // console.log("ctx", ctx.headers.authorization);
//       // console.log("args", args);

//       return ctx.dataSources.comments.getComments(args.query);
//     },
//   },
//   Mutation: {
//     updateUser: async (_, { id, data }, ctx) => {
//       const match = validateId(id);
//       if (!match) throw new UserInputError("Invalid ID argument value!");
//       await VDocExist.validateUserDocumentExistence(id);

//       return ctx.dataSources.users.updateUser(id, data);
//     },
//     removeUser: async (_, { id }, ctx) => {
//       const match = validateId(id);
//       if (!match) throw new UserInputError("Invalid ID argument value!");
//       await VDocExist.validateUserDocumentExistence(id);

//       const user = await ctx.dataSources.users.removeUser(id);
//       const posts = await ctx.dataSources.posts.getToBeDeletedPosts(user._id);
//       async.each(
//         //https://stackoverflow.com/questions/31662783/mongoose-find-and-remove
//         posts,
//         (post, callback) => {
//           ctx.dataSources.posts.removePost(post._id);
//           ctx.dataSources.comments.removeCommentsAssociatedToPost(post._id);
//           callback();
//         },
//         (err) => {
//           if (err) console.log("operation failed");
//           else console.log("operation success!");
//         }
//       );
//       await ctx.dataSources.comments.removeCommentsAssociatedToUser(user._id);
//       return user;
//     },
//     createPost: async (_, { data }, ctx) => {
//       const match = validateId(data.author);
//       if (!match) throw new UserInputError("Invalid ID argument value!");
//       await VDocExist.validateUserDocumentExistence(data.author);

//       return ctx.dataSources.posts.addPost(data);
//     },
//     updatePost: async (_, { id, data }, ctx) => {
//       const match = validateId(id);
//       if (!match) throw new UserInputError("Invalid ID argument value!");
//       await VDocExist.validatePostDocumentExistence(id);

//       return ctx.dataSources.posts.updatePost(id, data);
//     },
//     removePost: async (_, { id }, ctx) => {
//       const match = validateId(id);
//       if (!match) throw new UserInputError("Invalid ID argument value!");
//       await VDocExist.validatePostDocumentExistence(id);

//       const post = await ctx.dataSources.posts.removePost(id);
//       await ctx.dataSources.comments.removeCommentsAssociatedToPost(post._id);
//       return post;
//       // delete all related comments
//     },
//     createComment: async (_, { data }, ctx) => {
//       // console.log("ctx", ctx.headers.authorization);
//       // console.log("args", data);
//       const matchA = validateId(data.author);
//       const matchP = validateId(data.post);
//       if (!matchA || !matchP)
//         throw new UserInputError("Invalid ID argument value!");
//       await VDocExist.validateUserDocumentExistence(data.author);
//       await VDocExist.validatePostDocumentExistence(data.post);

//       return ctx.dataSources.comments.addComment(data);
//     },
//     updateComment: async (_, { id, data }, ctx) => {
//       const match = validateId(id);
//       if (!match) throw new UserInputError("Invalid ID argument value!");
//       await VDocExist.validateCommentDocumentExistence(id);

//       return ctx.dataSources.comments.updateComment(id, data);
//     },
//     removeComment: async (_, { id }, ctx) => {
//       const match = validateId(id);
//       if (!match) throw new UserInputError("Invalid ID argument value!");
//       await VDocExist.validateCommentDocumentExistence(id);

//       return ctx.dataSources.comments.removeComment(id);
//     },
//   },
//   Subscription: {},
//   User: {
//     posts(parent, _, ctx) {
//       return ctx.dataSources.posts.getAllPostOfUser(parent._id);
//     },
//     comments(parent, _, ctx) {
//       return ctx.dataSources.comments.getAllCommentOfUser(parent._id);
//     },
//   },
//   Post: {
//     author(parent, _, ctx) {
//       return ctx.dataSources.users.getAuthorOfPost(parent.author);
//     },
//     comments(parent, _, ctx) {
//       return ctx.dataSources.comments.getAllCommentOfPost(parent._id);
//     },
//   },
//   Comment: {
//     author(parent, _, ctx) {
//       return ctx.dataSources.users.getAuthorOfComment(parent.author);
//     },
//     post(parent, _, ctx) {
//       return ctx.dataSources.posts.getPostOfComment(parent.post);
//     },
//   },
// };
