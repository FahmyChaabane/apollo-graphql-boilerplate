import { User } from "../models/user";
import validateUser from "../services/validateUserLoggingSchema";
import bcrypt from "bcryptjs";
import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  // loggining
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findByEmail(req.body.email);
  if (!user) return res.status(400).send("Email or Password invalid.");

  const validPwd = await bcrypt.compare(req.body.password, user.password);
  if (!validPwd) return res.status(400).send("Email or Password invalid.");

  const token = await user.generateJWT();
  console.log("jwt token genrated: ", token);

  res.send(token);
});

export default router;
