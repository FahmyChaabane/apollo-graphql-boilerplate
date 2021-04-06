import { ApolloServer } from "apollo-server-express";
import schema from "../typeDefs";
import resolvers from "../resolvers";
import getUser from "../utils/decodeUserFromJWT";
import Users from "../data-sources/user";
import Posts from "../data-sources/post";
import Comments from "../data-sources/comment";
import { User } from "../models/user";
import { Comment } from "../models/comment";
import { Post } from "../models/post";
import { AuthenticationError } from "apollo-server-express";

export default () => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    dataSources: () => ({
      users: new Users(User),
      posts: new Posts(Post),
      comments: new Comments(Comment),
    }),
    context: async ({ req }) => {
      // get the user token from the headers
      const token = req.headers.authorization || "";
      let user;
      try {
        // try to retrieve a user with the token
        user = await getUser(token);
      } catch (error) {
        // block the user
        throw new AuthenticationError(
          "Access denied. No token provided or Invalid token."
        );
      }
      // add the user to the context
      return { user };
    },
  });
  return server;
};
