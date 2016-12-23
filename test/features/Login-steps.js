import { waitAndClickButton, waitAndSetValue } from './webdriver';
import { user } from './userInfo';

module.exports = function() {
  "use strict";

  this.Before(function() {
    browser.setViewportSize({
      width: 1280,
      height: 1040,
    });
    this.accounts = {
      logout() {
        client
          .timeoutsAsyncScript(20000)
          .executeAsync((done) => {
            Meteor.logout((logoutError) => {
              if (logoutError) throw logoutError;
              done();
            });
          });
      },
    };
    const LogOutBeforeExecute = ()=>{
      const url = client.getUrl();
      if (!(url === ("data:," || "http://localhost:3000"))) {
        this.accounts.logout();
      }
    };
    LogOutBeforeExecute();
  });

  this.After( function() {
    this.accounts.logout();
  });

  this.Given(/^that I am a user$/, function() {
    server.call('login', {
      user: {username: user.username},
      password: user.password
    });
  });

  this.When(/^I Login as a user$/, function() {
    client.url("http://localhost:3000");
    waitAndClickButton("#at-nav-button");
    waitAndSetValue("input[name=at-field-username_and_email]", user.username);
    waitAndSetValue("input[name=at-field-password]", user.password);
    waitAndClickButton("#at-btn");
  });

  this.Then(/^I should see home view$/, function() {
    expect(client.waitForExist("#home-content", 2000)).to.equal(true);
  });
};
