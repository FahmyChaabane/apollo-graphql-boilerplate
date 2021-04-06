import mongoose from "mongoose";

export default (value) => mongoose.Types.ObjectId.isValid(value);
