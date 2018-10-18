const fs = require('fs');
const formatFeature = require('./formatFeature.js');

module.exports = (feature) => {
  const filename = `${feature.Feature}.feature`;

  console.log(`creating ${filename}`);
  fs.writeFileSync(filename, formatFeature(feature));
}
