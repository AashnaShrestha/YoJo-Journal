const prisma = require("@/lib/prisma");
const moment = require("moment");

module.exports = async (queryObj) => {
  const parsedMonth = Number(queryObj.month);
  const parsedYear = Number(queryObj.year);

  const nowUtc = moment().utc();
  const month =
    Number.isInteger(parsedMonth) && parsedMonth >= 1 && parsedMonth <= 12
      ? parsedMonth
      : nowUtc.month() + 1;
  const year = Number.isInteger(parsedYear) ? parsedYear : nowUtc.year();

  const startDate = moment
    .utc({ year, month: month - 1, day: 1 })
    .startOf("day")
    .toDate();
  const endDate = moment.utc(startDate).add(1, "month").toDate();

  const where = {
    userId: queryObj.userId,
    createdAt: {
      gte: startDate,
      lt: endDate,
    },
  };

  const journals = await prisma.journal.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
  });

  return journals;
};
