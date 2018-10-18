const axios = require('axios');
const createFeatureFromIssue = require('./createFeatureFromIssue');

module.exports = (auth) => {

  let features = [],
      maxResults = 50,
      startAt = 0;

  function appendNextPage(err, done) {
      console.log(`getting page startAt=${startAt}`);

      axios.get(`https://jira.intdigital.ee.co.uk/rest/api/2/search?startAt=${startAt}&maxResults=${maxResults}&jql=issue%20in%20TestRepositoryFolderTests(XTP%2C%27SelfServe%27%2C%27true%27)%20and%20status%20%3D%20Done%20and%20labels%20%3D%20Automation`, {
        auth: auth
      })
      .then( (response) => {
        if (response.data.issues.length == 0) {
          done()
        } else {
          features = features.concat(
            response.data.issues.map( issue => createFeatureFromIssue(issue) )
          );

          startAt = startAt + maxResults;
          appendNextPage(err, done);
        }

      })
      .catch(error => {
        err(error);
      });

  }

  return new Promise( (resolve, reject) => {
    appendNextPage(
      (error) => { reject(error)},
      () => { resolve(features) }
    )
  });
}
