
module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    await db.collection("links").updateMany({}, {
      $set: { categories: [] },
    })
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible);
  }
};
