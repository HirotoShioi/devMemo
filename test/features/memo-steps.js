import { waitAndSetValue } from './webdriver';
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
    const userId = user.userId;
    client.pause(3000);
    let getMemo = server.execute( (searchUrl, ownerUserId) => {
      const { Memos } = require('/imports/api/memos.js');
      return Memos.findOne({ url: searchUrl, owner: ownerUserId });
    }, url, userId );
    expect(getMemo.url).to.equal(url);
  });

};
