const prisma = require("@/lib/prisma");
const { ValidationError } = require("@/utils/error");

module.exports = async (queryObj) => {
  const updatedJournal = await prisma.journal.update({
    where: {
      id: queryObj.journalId,
      userId: queryObj.userId,
    },
    data: {
      name: queryObj.name,
      content: queryObj.content,
    },
  });

  if (!updatedJournal) {
    throw new ValidationError("Could not update journal", 500);
  }

  return updatedJournal;
};
