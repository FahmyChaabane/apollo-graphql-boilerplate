import jwt from "jsonwebtoken";

export default async (token) => {
  const decodedPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);
  return decodedPayload;
};
