import {  waitAndClickButton, waitAndSetValue } from './webdriver';
import { user } from './userInfo';
module.exports = function() {
  this.Before(function() {
  });
  this.After(function() {
    server.execute((userId)=>{
      const { Label } = require('/imports/api/label.js');
      return Label.remove({owner: userId });
    }, user.userId);
  });
  this.When(/^I fill in the form with label name "([^"]*)"$/, function(labelName) {
    waitAndSetValue("input[name=labelName]", labelName);
  });

  this.When(/^I submit label form$/, function() {
    client.submitForm("#addLabel");
  });

  this.Then(/^I should see my new label "([^"]*)"$/, function(labelName) {
    const userId = user.userId;
    client.pause(400);
    waitAndClickButton('#label-bar');
    let getLabel = server.execute( (label, ownerUserId) => {
      const { Label } = require('/imports/api/label.js');
      return Label.findOne({ name: label, owner: ownerUserId });
    }, labelName, userId );
    expect(getLabel.name).to.equal(labelName);
  });
};
