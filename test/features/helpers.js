import { waitAndClickButton } from './webdriver';

module.exports = function() {
  this.When(/^I press "([^"]*)"$/, function(buttonClass) {
    waitAndClickButton(`#${buttonClass}`);
  });
};
