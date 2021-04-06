import { User } from "../models/user";
import validateUserInput from "../utils/validateUserRegistrationSchema";
import validatePassedId from "../utils/validateMongodbId";
import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post("/", async (req, res) => {
  // registering
  const { error } = validateUserInput(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findByEmail(req.body.email);
  if (user) return res.status(400).send("User already registered.");

  user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    age: req.body.age,
    role: req.body.role,
    email: req.body.email,
    password: req.body.password,
  });
  await user.save();

  const token = await user.generateJWT();
  console.log("jwt token genrated: ", token);
  res.header("x-auth", token).send(user);
});

router.get("/:id", async (req, res) => {
  const valid = validatePassedId(req.params.id);
  if (!valid)
    return res.status(400).send("The User with the given ID is not valid.");

  const user = await User.findById(req.params.id);
  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(user);
});

export default router;
