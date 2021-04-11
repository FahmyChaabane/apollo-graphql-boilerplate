import "express-async-errors";
import express from "express";
import cors from "cors";
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

    const whitelist = ["http://localhost:4000"];
    const corsOptions = {
      origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      // allowedHeaders: ["content-length", "content-type", "x-auth"],
      exposedHeaders: ["content-length", "content-type", "x-auth"],
    };
    app.use(cors(corsOptions));

    app.use(express.json());
    app.use("/api/register", register);
    app.use("/api/auth", auth);
    app.use("/", home);
    app.use(error);

    app.listen(APP_PORT, () => {
      console.log(`🚀 🚀  Server set up for ${NODE_ENV} environment!`);
      console.log(
        `🚀 🚀 🚀 GraphQL Server ready at http://localhost:${APP_PORT}${server.graphqlPath}  !`
      );
    });
  } catch (e) {
    console.log(e.message);
  }
})();
