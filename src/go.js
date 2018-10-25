const recreateAllFeatureFiles = require('./recreateAllFeatureFiles');

// get username/password from commandline
const auth = {
    username: process.argv[2],
    password: process.argv[3]
  };

// do the thing.
recreateAllFeatureFiles(auth);
