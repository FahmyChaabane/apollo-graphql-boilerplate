import "express-async-errors";
import express from "express";
import dbConfig from "./configs/db";
import apolloConfig from "./configs/apollo";
import register from "./routes/register";
import auth from "./routes/auth";
import home from "./routes/home";
import error from "./middlewares/error";

const { APP_PORT, NODE_ENV, MONGO_DATABASE } = process.env;

(async () => {
  try {
    await dbConfig();
    console.log(`🚀 connected to ${MONGO_DATABASE} DB!`);

    const server = apolloConfig();
    await server.start();

    const app = express();
    server.applyMiddleware({ app });

    app.use(express.json());
    app.use("/api/register", register);
    app.use("/api/auth", auth);
    app.use("/", home);
    app.use(error);

    app.listen(APP_PORT, () => {
      console.log(`🚀 🚀  Server set up for ${NODE_ENV} environment!`);
      console.log(
        `🚀 🚀 🚀 GraphQL Server ready at http://localhost:${APP_PORT}${server.graphqlPath}!`
      );
    });
  } catch (e) {
    console.log(e.message);
  }
})();
