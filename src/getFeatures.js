const axios = require('axios');
const createFeatureFromIssue = require('./createFeatureFromIssue');


module.exports = (auth) => {

  function urlFor(startAt, maxResults) {
    // get paginated query
    return `https://jira.intdigital.ee.co.uk/rest/api/2/search?startAt=${startAt}&maxResults=${maxResults}&jql=issue%20in%20TestRepositoryFolderTests(XTP%2C%27SelfServe%27%2C%27true%27)%20and%20status%20%3D%20Done%20and%20labels%20%3D%20Automation`;
  }

  async function collectPages(resolve, reject, features, startAt, maxResults) {
    // get next page of data
    // if empty we're done, otherwise append the features and recurse..

    console.log(`getting page startAt=${startAt}`);

    try {

      const response = await axios.get( urlFor(startAt, maxResults), {auth: auth});

      if (response.data.issues.length == 0) {
        resolve(features)
      } else {
        collectPages(
          resolve,
          reject,
          features.concat( response.data.issues.map(issue => createFeatureFromIssue(issue)) ),
          startAt + maxResults,
          maxResults
        );
      }

    } catch (error) {
      reject(error);
    }

  }

  // launch the recursion...
  return new Promise( (resolve, reject) => {
    collectPages( resolve, reject, [], 0, 50 );
  });
}
