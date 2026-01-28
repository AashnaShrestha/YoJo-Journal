const prisma = require("@/lib/prisma");
const { ValidationError } = require("@/utils/error");

module.exports = async (queryObj) => {
  
  const journal = await prisma.journal.create({
    data: {
      name: queryObj.name,
      content: queryObj.content,
      userId: queryObj.userId,
    },
  });

  if (!journal) {
    throw new ValidationError("Could not create journal", 400);
  }

  return journal;
};
