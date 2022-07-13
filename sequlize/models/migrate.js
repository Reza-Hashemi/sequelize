const User = require('./user');

(async function () {
  try {
    await User.sync({ force: true });
  } catch (error) {
    console.error('Unable to sync table:', error);
    process.exit(1);
  }
})();
