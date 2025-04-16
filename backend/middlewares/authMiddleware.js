// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "You need to log in first" });
  }
  next();
};

export default { isAuthenticated };
