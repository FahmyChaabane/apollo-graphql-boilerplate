import "express-async-errors";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import dbConfig from "./configs/db";
import schema from "./typeDefs";
import resolvers from "./resolvers";
import register from "./routes/register";
import auth from "./routes/auth";
import home from "./routes/home";
import error from "./middlewares/error";
import Users from "./data-sources/user";
import Posts from "./data-sources/post";
import Comments from "./data-sources/comment";
import { User } from "./models/user";
import { Comment } from "./models/comment";
import { Post } from "./models/post";

const { APP_PORT, NODE_ENV, MONGO_DATABASE } = process.env;

(async () => {
  try {
    await dbConfig();
    console.log(`🚀 connected to ${MONGO_DATABASE} db...`);

    const app = express();
    const server = new ApolloServer({
      typeDefs: schema,
      resolvers,
      dataSources: () => ({
        users: new Users(User),
        posts: new Posts(Post),
        comments: new Comments(Comment),
      }),
      context: ({ req }) => {
        return req;
      },
    });
    await server.start();

    server.applyMiddleware({ app });

    app.use(express.json());
    app.use("/api/register", register);
    app.use("/api/auth", auth);
    app.use("/", home);
    app.use(error);

    app.listen(
      APP_PORT,
      console.log(
        `🚀 🚀 🚀 Server ready at http://localhost:${APP_PORT}${server.graphqlPath} for ${NODE_ENV} environment`
      )
    );
  } catch (e) {
    console.log(e.message);
  }
})();
