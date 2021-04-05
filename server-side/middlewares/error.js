export default (err, req, res, next) => {
  //Logging the error
  console.log(err.message);
  res.status(500).send("Something had failed.");
  next(err);
};
