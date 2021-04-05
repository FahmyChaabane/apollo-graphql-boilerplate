import mongoose from "mongoose";

export default {
  Query: {
    users(parent, args, ctx, profile) {
      console.log("ctx", ctx.headers.authorization);
      console.log("args", args);

      return ctx.dataSources.users.getUsers(args.query);
    },
  },
  Mutation: {},
  Subscription: {},
};
