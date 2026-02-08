const prisma = require('@/lib/prisma');
const ValidationError = require('@/utils/error');
const { id } = require('date-fns/locale');

module.exports = async (queryObj) => {
    await prisma.journal.delete({
        where:{
            id: queryObj.journalId,
            userId: queryObj.userId
        }
    });

    return { success: true };
}