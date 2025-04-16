// prisma/middleware/hashPassword.js
import { genSalt, hash } from "bcryptjs";

const hashPasswordMiddleware = async (params, next) => {
  if (
    params.model === "User" &&
    (params.action === "create" || params.action === "update")
  ) {
    const password = params.args.data.password;
    if (password) {
      const salt = await genSalt(10);
      params.args.data.password = await hash(password, salt);
    }
  }
  return next(params);
};

export default hashPasswordMiddleware;
