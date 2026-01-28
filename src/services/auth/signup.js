const prisma = require("../../lib/prisma");
const bcrypt = require("bcrypt");
const ValidationError = require("@/utils/error");

module.exports = async (req) => {
  console.log(Object.keys(prisma))
  const { email, password, name } = req;

  if (!email || !password) {
    throw new ValidationError("Email or password not provided", 400);
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    throw new ValidationError("User already exists", 400);
  }

  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  if (!user) {
    throw new ValidationError("Could not create user", 400);
  }

  delete user.password;

  return user;
};
