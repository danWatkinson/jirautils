module.exports = (issue) => {
  return {
    Feature: issue.key,
    Scenario: issue.fields.summary,
    Gherkin: issue.fields.customfield_16549
  }
}
