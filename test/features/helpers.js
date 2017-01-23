import { waitAndClickButton } from './webdriver';

module.exports = function() {
  this.When(/^I press "([^"]*)"$/, function(buttonClass) {
    client.pause(300);
    waitAndClickButton(`#${buttonClass}`);
  });
};
