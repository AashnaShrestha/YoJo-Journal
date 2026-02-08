const createJournal = require('./create-journal');
const listJournals = require('./list-journal');
const getJournalDetail = require('./get-journal-detail');
const updateJournal = require('./update-journal');
const deleteJournal = require('./delete-journal');

module.exports = {
  createJournal,
  listJournals,
  getJournalDetail,
  updateJournal,
  deleteJournal
}