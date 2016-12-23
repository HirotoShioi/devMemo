import { waitAndClickButton } from './webdriver';

module.exports = function() {
  this.When(/^I press "([^"]*)"$/, function(buttonClass) {
    client.pause(100);
    waitAndClickButton(`#${buttonClass}`);
  });
};
