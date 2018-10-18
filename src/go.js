const getFeatures = require('./getFeatures');
const writeFeatureFile = require('./writeFeatureFile');

const auth = {
    username: process.argv[2],
    password: process.argv[3]
  };

getFeatures(auth)
  .then((data)=> {
    data.forEach( (feature) => {
      writeFeatureFile( feature );
    })
  })
  .catch((error) => {
    console.log(error);
  })
