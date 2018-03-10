const { runAppTests } = require('./app.spec');
const { runParseTests } = require('./parse.spec');
const { runUtilsTests } = require('./utils.spec');
const { runMulterSetupTests } = require('./multerSetup.spec');

runAppTests();

runParseTests();

runUtilsTests();

runMulterSetupTests();
