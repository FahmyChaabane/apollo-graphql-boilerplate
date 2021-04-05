import mongoose from "mongoose";

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DATABASE } = process.env;

export default async () =>
  mongoose.connect(
    `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.8njmj.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  );
