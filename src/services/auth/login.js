const prisma = require("@/lib/prisma");
const { ValidationError } = require("@/utils/error");
const bcrypt = require("bcrypt");

module.exports = async(queryObj) => {
  const user = await prisma.user.findUnique({
    where: {
      email: queryObj.email
    }
  });
  if (!user) {
    throw new ValidationError("Invalid email or password", 400);
  }
  
  if (!bcrypt.compareSync(queryObj.password, user.password)) {
    throw new ValidationError("Invalid email or password", 400);
  }
  
  delete user.password;
  return user;
}