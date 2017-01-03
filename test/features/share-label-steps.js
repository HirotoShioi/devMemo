import { createLabelShare, createLabel, getLabelShare } from './builder.js';
import { waitAndClickButton, waitAndSetValue } from './webdriver';
import { user, user2 } from './userInfo.js';
module.exports = function() {

  this.After( function() {
    server.execute((otherUser)=>{
      const { labelShare } = require('/imports/api/labelShare.js');
      labelShare.remove({$or: [{sharedFrom: Meteor.userId()}, {sharedTo: Meteor.userId()}]});
      const { Label } = require('/imports/api/label.js');
      Label.remove({owner: otherUser._id});
    }, user2);
  });

  this.Given(/^other user has label name "([^"]*)"$/, function(labelName) {
    const labelObj = {
      name: labelName,
      owner: user2._id
    };
    this.otherUserLabel = createLabel(labelObj);
  });

  this.Given(/^I have request from that user$/, function() {
    const shareObj = {
      sharedFrom: user2._id,
      sharedTo: user._id,
      status: "pending",
      requestNotified: false,
      respondNotified: false,
      labelId: this.otherUserLabel._id,
    };
    this.requestShare = createLabelShare(shareObj);
  });

  this.When(/^I accept the label sharing$/, function() {
    waitAndClickButton(".accept-share");
  });

  this.When(/^I deny the label sharing$/, function() {
    waitAndClickButton(".deny-share");
  });

  this.Then(/^that request should be in accepted state$/, function() {
    const getSharedLabel = getLabelShare({_id: this.requestShare._id});
    expect(getSharedLabel.status).to.equal("accepted");
  });

  this.Then(/^that request should be in denied state$/, function() {
    const getSharedLabel = getLabelShare({_id: this.requestShare._id});
    expect(getSharedLabel.status).to.equal("denied");
  });

  this.Then(/^I should see the shared label in label bar$/, function() {
    waitAndClickButton('#label-bar');
    const isSharedLabelVisible = client.waitForVisible(`#label-${this.otherUserLabel._id}`, 3000);
    expect(isSharedLabelVisible).to.equal(true);
  });

  this.Then(/^I should not see the shared label in label bar$/, function() {
    waitAndClickButton('#label-bar');
    const isSharedLabelVisible = client.isVisible(`#label-${this.otherUserLabel._id}`);
    expect(isSharedLabelVisible).to.equal(false);
  });

  this.When(/^I go to label detail view$/, function() {
    waitAndClickButton('#label-bar');
    client.pause(500);
    client.click(`.label-bar-chip`);
  });

  this.When(/^I press add user$/, function() {
    waitAndClickButton(".add-share-user");
  });

  this.When(/^I fill in the share form$/, function() {
    client.pause(150);
    waitAndSetValue("#addShareUser input[name=username]", "testWebDriver2");
  });

  this.When(/^I submit share form$/, function() {
    client.submitForm("#addShareUser");
  });

  this.Then(/^I should send request to the user$/, function() {
    const query = {
      labelId: this.label._id
    };
    const isRequestSend = getLabelShare(query);
    expect(isRequestSend.status).to.equal("pending");
  });
};
