// prisma/middleware/hashPassword.js
const bcrypt = require("bcryptjs");

const hashPasswordMiddleware = async (params, next) => {
  if (
    params.model === "User" &&
    (params.action === "create" || params.action === "update")
  ) {
    const password = params.args.data.password;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      params.args.data.password = await bcrypt.hash(password, salt);
    }
  }
  return next(params);
};

module.exports = hashPasswordMiddleware;
