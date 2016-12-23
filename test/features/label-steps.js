import {  waitAndClickButton, waitAndSetValue } from './webdriver';
import { user } from './userInfo';
import { getLabel, createLabel } from './builder';

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
    client.click(`li[data="#ff5252"]`);
  });

  this.When(/^I submit label form$/, function() {
    client.submitForm("#addLabel");
  });

  this.Then(/^I should see my new label "([^"]*)"$/, function(labelName) {
    client.pause(400);
    waitAndClickButton('#label-bar');
    let query = {
      name: labelName,
      owner: user.userId
    };
    let label = getLabel(query);
    expect(label.name).to.equal(labelName);
  });

  this.Given(/^I have a label "([^"]*)"$/, function(labelName) {
    const labelObj = {
      name: labelName,
      owner: user.userId
    };
    this.label = createLabel(labelObj);
  });

  this.When(/^I press edit label$/, function() {
    client.pause(300);
    client.click("#" + this.label._id);
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
    const query = {
      name: labelName,
      owner: user.userId
    };
    let label = getLabel(query);
    expect(label.name).to.equal(labelName);
  });

  this.When(/^I press delete label$/, function() {
    client.pause(300);
    client.click("#" + this.label._id);
    waitAndClickButton('.label-delete');
  });

  this.When(/^I submit the delete form$/, function() {
    client.pause(300);
    waitAndClickButton('.delete-label-btn');
  });

  this.Then(/^I should see my label "([^"]*)" deleted$/, function(labelName) {
    client.pause(300);
    const query = {
      name: labelName,
      owner: user.userId
    };
    let label = getLabel(query);
    expect(label).to.equal(undefined);
  });
};
