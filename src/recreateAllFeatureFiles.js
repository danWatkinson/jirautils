const getFeatures = require('./getFeatures');
const writeFeatureFile = require('./writeFeatureFile');

module.exports = async function recreateAllFeatureFiles(auth) {
  // get all feature definitions from jira
  // then write them all to files
  
  try {

    const features = await getFeatures(auth);
    features.forEach( (feature) => {
      writeFeatureFile( feature );
    });

  } catch (error) {
    console.log(error);
  }

}
