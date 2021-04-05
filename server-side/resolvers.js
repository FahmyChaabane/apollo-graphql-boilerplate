import async from "async";

export default {
  Query: {
    users(parent, args, ctx, profile) {
      // console.log("ctx", ctx.headers.authorization);
      // console.log("args", args);

      return ctx.dataSources.users.getUsers(args.query);
    },
    posts(parent, args, ctx, profile) {
      // console.log("ctx", ctx.headers.authorization);
      // console.log("args", args);

      return ctx.dataSources.posts.getPosts(args.query);
    },
    comments(parent, args, ctx, profile) {
      // console.log("ctx", ctx.headers.authorization);
      // console.log("args", args);

      return ctx.dataSources.comments.getComments(args.query);
    },
  },
  Mutation: {
    updateUser(parent, { id, data }, ctx, profile) {
      // id valication
      return ctx.dataSources.users.updateUser(id, data);
    },
    removeUser: async (parent, { id }, ctx, profile) => {
      // id valication

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
    createPost(parent, { data }, ctx, profile) {
      // console.log("ctx", ctx.headers.authorization);
      // console.log("args", data);

      return ctx.dataSources.posts.addPost(data);
    },
    updatePost(parent, { id, data }, ctx, profile) {
      // id valication
      return ctx.dataSources.posts.updatePost(id, data);
    },
    removePost: async (parent, { id }, ctx, profile) => {
      // id valication

      const post = await ctx.dataSources.posts.removePost(id);
      await ctx.dataSources.comments.removeCommentsAssociatedToPost(post._id);
      return post;
      // delete all related comments
    },
    createComment(parent, { data }, ctx, profile) {
      // console.log("ctx", ctx.headers.authorization);
      // console.log("args", data);

      return ctx.dataSources.comments.addComment(data);
    },
    updateComment(parent, { id, data }, ctx, profile) {
      // id valication
      return ctx.dataSources.comments.updateComment(id, data);
    },
    removeComment(parent, { id }, ctx, profile) {
      // id valication
      return ctx.dataSources.comments.removeComment(id);
    },
  },
  Subscription: {},
  User: {
    posts(parent, args, ctx, profile) {
      return ctx.dataSources.posts.getAllPostOfUser(parent._id);
    },
    comments(parent, args, ctx, profile) {
      return ctx.dataSources.comments.getAllCommentOfUser(parent._id);
    },
  },
  Post: {
    author(parent, args, ctx, profile) {
      return ctx.dataSources.users.getAuthorOfPost(parent.author);
    },
    comments(parent, args, ctx, profile) {
      return ctx.dataSources.comments.getAllCommentOfPost(parent._id);
    },
  },
  Comment: {
    author(parent, args, ctx, profile) {
      return ctx.dataSources.users.getAuthorOfComment(parent.author);
    },
    post(parent, args, ctx, profile) {
      return ctx.dataSources.posts.getPostOfComment(parent.post);
    },
  },
};
