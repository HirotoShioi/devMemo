import { waitAndSetValue, waitAndClickButton } from './webdriver';
import { user } from './userInfo';
import { getMemo, createMemo, updateMemo} from './builder';

module.exports = function() {
  this.Before( function() {
    this.url = "https://youtube.com";
  });

  this.After( function() {
    server.execute(()=>{
      const { Memos } = require('/imports/api/memos.js');
      return Memos.remove({owner: Meteor.userId() });
    });
  });

  this.When(/^I fill in url "([^"]*)"$/, function(url) {
    waitAndSetValue('input[name=url]', url);
  });

  this.When(/^I submit$/, function() {
    client.submitForm("#addMemo");
  });

  this.Then(/^I should see "([^"]*)" is added to my memo$/, function(url) {
    client.pause(3000);
    const query = {
      url: url,
    };
    let memo = getMemo(query);
    expect(memo.url).to.equal(url);
  });

  this.Given(/^I have memo "([^"]*)" with state of (.+)$/, function(url, isFavorited) {
    let favorite;
    if (isFavorited === "Favorited") {
      favorite = true;
    } else if (isFavorited === "unFavorited") {
      favorite = false;
    }
    const labelObj = {
      url: url,
      isFavorited: favorite,
    };
    this.memo = createMemo(labelObj);
  });

  this.Given(/^I have memo "([^"]*)"$/, function(url) {
    const labelObj = {
      url: url,
      isFavorited: false,
      name: url,
      provider_url: url,
      createdAt: Date.now(),
    };
    this.memo = createMemo(labelObj);
  });

  this.When(/^I click memo$/, function() {
    client.waitForVisible(`#card-${this.memo._id}`, 3000);
    client.click(`#card-${this.memo._id}`);
  });

  this.When(/^I press heart icon$/, function() {
    client.pause(300);
    client.click(".heart");
  });

  this.Then(/^my memo "([^"]*)" should be (.+)$/, function(url, isFavorited) {
    let favorite;
    if (isFavorited === "Favorited") {
      favorite = true;
    } else if (isFavorited === "unFavorited") {
      favorite = false;
    }
    const query = {
      _id: this.memo._id
    };
    let memo = getMemo(query);
    expect(memo.isFavorited).to.equal(favorite);
  });

  this.When(/^I click label$/, function() {
    waitAndClickButton(`.label-${this.label._id}`);
  });

  this.Then(/^I should see "([^"]*)" with label "([^"]*)" added to my memo$/, function(url, labelName) {
    client.pause(3000);
    const query = {
      url: url,
    };
    let memo = getMemo(query);
    expect(memo.url).to.equal(url);
    expect(memo.labelId).to.equal(this.label._id);
  });

  this.Then(/^I should see memo detail modal of "([^"]*)"$/, function(url) {
    const query = {
      url: url,
    };
    let memo = getMemo(query);
    const isModalVisible = client.waitForVisible(`#modal-card-${memo._id}`, 3000);
    expect(isModalVisible).to.equal(true);
  });

  this.When(/^I click more$/, function() {
    waitAndClickButton(".memo-detail");
  });

  this.Then(/^I should see memo detail view$/, function() {
    const isDetailViewVisible = client.waitForVisible("#memo-detail-content", 3000);
    expect(isDetailViewVisible).to.equal(true);
  });

  this.When(/^I search for "([^"]*)"$/, function(url) {
    client.pause(300);
    waitAndSetValue('input[name=memoSearch]', url);
  });

  this.Then(/^I should have a search result of the memo$/, function() {
    client.waitForVisible(`#memo-bar-item-${this.memo._id}`);
  });

  this.When(/^I press cog button$/, function() {
    waitAndClickButton(`#card-${this.memo._id}`);
    client.pause(300);
    waitAndClickButton(`.fa-cog`);
  });

  this.When(/^I fill in the form$/, function() {
    client.pause(500);
    client.click(`label=${this.label.name}`);
  });

  this.When(/^I submit memo label edit form$/, function() {
    client.submitForm("#editMemoLabel");
  });

  this.Then(/^I should see my memo "([^"]*)" has label$/, function(url) {
    let query = {
      _id: this.memo._id
    };
    let memo = getMemo(query);
    expect(memo.labelId).to.equal(this.label._id);
  });

  this.When(/^memo is expiring$/, function() {
    const today = Date.now();
    const modifier = {
      expiredAt: today
    };
    this.memo = updateMemo(this.memo._id, modifier);
    server.call('checkExpiration');
  });

  this.Then(/^my memo should be in status "([^"]*)"$/, function(status) {
    const query = {
      _id: this.memo._id
    };
    this.memo = getMemo(query);
    expect(this.memo.status).to.equal(status);
  });

  this.Then(/^I should have recommendation$/, function() {
    this.recommendation = server.call('getRecommend');
    expect(this.recommendation).to.have.property("result");
  });

  this.Then(/^I should see the search memo bar$/, function() {
    let isSearchBarVisible = client.waitForVisible("#search-bar", 2000);
    expect(isSearchBarVisible).to.equal(true);
  });

  this.When(/^I click image$/, function() {
    waitAndClickButton(".card-image-url");
    client.pause(1000);
    const tabs = client.getTabIds();
    client.switchTab(tabs[1]);
    client.close(tabs[0]);
  });

  this.When(/^I press archive icon$/, function() {
    client.pause(300);
    client.click(".archive-memo");
  });

  this.Given(/^the memo is expired$/, function() {
    const today = Date.now();
    const modifier = {
      expiredAt: today,
      status: "expired"
    };
    this.memo = updateMemo(this.memo._id, modifier);
  });

  this.Then(/^I should get a indicator about no memos$/, function() {
    let isNoMemoVisible = client.waitForVisible("#no-memo", 2000);
    expect(isNoMemoVisible).to.equal(true);
  });

  this.Then(/^the memo search bar is hidden$/, function() {
    let isMemoSearchInputVisible = client.isVisible(".memo-search-input", 2000);
    expect(isMemoSearchInputVisible).to.equal(false);
  });

  this.Given(/^I have no memos$/, function() {
    server.execute(()=>{
      const { Memos } = require('/imports/api/memos.js');
      return Memos.remove({owner: Meteor.userId() });
    });
  });

  this.Then(/^I should see empty memos$/, function() {
    let isEmptyMemoVisible = client.waitForVisible(".empty-card", 2000);
    expect(isEmptyMemoVisible).to.equal(true);
  });
};
