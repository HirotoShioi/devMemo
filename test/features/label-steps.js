import {  waitAndClickButton, waitAndSetValue } from './webdriver';
import { user } from './userInfo';
import { getLabel, createLabel } from './builder';

module.exports = function() {

  this.Before(function() {
  });
  this.After(function() {
    server.execute(()=>{
      const { Label } = require('/imports/api/label.js');
      return Label.remove({owner: Meteor.userId() });
    });
  });
  this.When(/^I fill in the form with label name "([^"]*)"$/, function(labelName) {
    waitAndSetValue("input[name=labelName]", labelName);
    client.click(`li[data="#ff5252"]`);
  });

  this.When(/^I submit label form$/, function() {
    client.submitForm("#addLabel");
  });

  this.Then(/^I should see my new label "([^"]*)"$/, function(labelName) {
    client.pause(500);
    waitAndClickButton('#label-bar');
    let query = {
      name: labelName,
    };
    let label = getLabel(query);
    expect(label.name).to.equal(labelName);
  });

  this.Given(/^I have a label "([^"]*)"$/, function(labelName) {
    const labelObj = {
      name: labelName,
    };
    this.label = createLabel(labelObj);
  });

  this.When(/^I press edit label$/, function() {
    client.pause(300);
    client.click(`#label-${this.label._id}`);
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
      _id: this.label._id
    };
    let label = getLabel(query);
    expect(label.name).to.equal(labelName);
  });

  this.When(/^I press delete label$/, function() {
    client.pause(300);
    client.click(`#label-${this.label._id}`);
    waitAndClickButton('.label-delete');
  });

  this.When(/^I submit the delete form$/, function() {
    client.pause(300);
    waitAndClickButton('.delete-label-btn');
  });

  this.Then(/^I should see my label "([^"]*)" deleted$/, function(labelName) {
    client.pause(500);
    const query = {
      _id: this.label._id,
    };
    let label = getLabel(query);
    expect(label).to.equal(undefined);
  });

  this.When(/^I search for label "([^"]*)"$/, function(labelName) {
    client.pause(300);
    waitAndSetValue("input[name=labelSearch]", labelName);
  });

  this.Then(/^I should see the label bar$/, function() {
    let isLabelBarVisible = client.waitForVisible("#label-search-bar", 2000);
    expect(isLabelBarVisible).to.equal(true);
  });

  this.Then(/^I should see my label in the search result$/, function() {
    let isLabelSearchResultVisible = client.waitForVisible(`#label-${this.label._id}`, 2000);
    expect(isLabelSearchResultVisible).to.equal(true);
  });

  this.Given(/^I have no labels$/, function() {
    server.execute(()=>{
      const { Label } = require('/imports/api/label.js');
      return Label.remove({owner: Meteor.userId() });
    });
  });

  this.Then(/^I should get a indicator about no labels$/, function() {
    let isNoLabelVisible = client.waitForVisible("#no-label", 2000);
    expect(isNoLabelVisible).to.equal(true);
  });

  this.Then(/^the label search bar is hidden$/, function() {
    let isLabelSearchInputVisible = client.isVisible(".label-search-input", 2000);
    expect(isLabelSearchInputVisible).to.equal(false);
  });
};
