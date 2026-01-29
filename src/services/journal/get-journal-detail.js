const prisma  = require("@/lib/prisma");
const {ValidationError} = require('@/utils/error');
const { id } = require("date-fns/locale");

module.exports = async ({journalId, userId}) => {
    const journal = await prisma.journal.findFirst({
        where:{
            id: journalId,
            userId: userId
        }
    });
    if(!journal){
        throw new ValidationError('Journal not found', 404);
    }
    return journal;
}