module.exports = (feature) => {
  return `Feature: ${feature.Feature} \n\nScenario: ${feature.Scenario} \n\n${feature.Gherkin}\n`
}
