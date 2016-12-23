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

  this.Given(/^have a label "([^"]*)"$/, function(labelName) {
    this.label = server.execute((name, userId)=>{
      const { Label } = require('/imports/api/label.js');
      Label.insert({name: name, owner: userId});
      return Label.findOne({name: name, owner: userId});
    }, labelName, user.userId);
  });

  this.When(/^I press edit label$/, function() {
    client.pause(300);
    client.click(`#${this.label._id}`);
    waitAndClickButton('.label-edit');
  });

  this.When(/^I change the name to "([^"]*)"$/, function(labelName) {
    client.pause(150);
    waitAndSetValue("#editLabel input[name=name]", labelName);
  });

  this.When(/^I submit the edit form$/, function() {
    client.submitForm("#editLabel");
  });

  this.Then(/^I should see my label changed to "([^"]*)"$/, function(labelName) {
    const userId = user.userId;
    let getLabel = server.execute( (label, ownerUserId) => {
      const { Label } = require('/imports/api/label.js');
      return Label.findOne({ name: label, owner: ownerUserId });
    }, labelName, userId );
    expect(getLabel.name).to.equal(labelName);
  });
};
