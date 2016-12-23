import { waitAndSetValue, waitAndClickButton } from './webdriver';
import { user } from './userInfo';
module.exports = function() {
  this.Before( function() {
    this.url = "https://youtube.com";
  });

  this.After( function() {
    server.execute((userId)=>{
      const { Memos } = require('/imports/api/memos.js');
      return Memos.remove({owner: userId });
    }, user.userId);
  });

  this.When(/^I fill in url "([^"]*)"$/, function(url) {
    waitAndSetValue('input[name=url]', url);
  });

  this.When(/^I submit$/, function() {
    client.submitForm("#addMemo");
  });

  this.Then(/^I should see "([^"]*)" is added to my memo$/, function(url) {
    client.pause(3000);
    let getMemo = server.execute( (searchUrl, ownerUserId) => {
      const { Memos } = require('/imports/api/memos.js');
      return Memos.findOne({ url: searchUrl, owner: ownerUserId });
    }, url, user.userId );
    expect(getMemo.url).to.equal(url);
  });

  this.Given(/^I have memo "([^"]*)"$/, function(url) {
    this.memo = server.execute( (insertUrl, ownerUserId) => {
      const { Memos } = require('/imports/api/memos.js');
      Memos.insert({url: insertUrl, owner: ownerUserId,  isFavorited: false});
      return Memos.findOne({url: insertUrl, owner: ownerUserId});
    }, url, user.userId );
  });

  this.When(/^I click memo$/, function() {
    client.waitForVisible(`#${this.memo._id}`, 3000);
    client.click(`#${this.memo._id}`);
  });

  this.When(/^I press heart icon$/, function() {
    client.pause(300);
    client.click(".heart");
  });

  this.Then(/^my memo "([^"]*)" should be favorited$/, function(url) {
    this.memo = server.execute( (searchUrl, ownerUserId) => {
      const { Memos } = require('/imports/api/memos.js');
      return Memos.findOne({ url: searchUrl, owner: ownerUserId });
    }, url, user.userId );
    expect(this.memo.isFavorited).to.equal(true);
  });

  this.When(/^I click label$/, function() {
    waitAndClickButton("." + this.label._id);
  });

  this.Then(/^I should see "([^"]*)" with label "([^"]*)" added to my memo$/, function(url, labelName) {
    client.pause(3000);
    let getMemo = server.execute( (searchUrl, label, ownerUserId) => {
      const { Memos } = require('/imports/api/memos.js');
      return Memos.findOne({ url: searchUrl, owner: ownerUserId, labelId: label});
    }, url, this.label._id, user.userId );
    expect(getMemo.url).to.equal(url);
    expect(getMemo.labelId).to.equal(this.label._id);
  });
};
