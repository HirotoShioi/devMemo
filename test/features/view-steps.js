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
    server.call('changeLanguage', {language: "ja"});
    this.accounts.logout();
  });

  this.Given(/^that I am a user$/, function() {
    server.call('login', {
      user: {username: user.username},
      password: user.password
    });
  });

  this.When(/^I login as a user$/, function() {
    client.url("http://localhost:3000");
    waitAndClickButton("#at-nav-button");
    waitAndSetValue("input[name=at-field-username_and_email]", user.username);
    waitAndSetValue("input[name=at-field-password]", user.password);
    waitAndClickButton("#at-btn");
  });

  this.When(/^I press Logout$/, function() {
    waitAndClickButton("#user-link");
    waitAndClickButton("#logout-link");
  });

  this.Then(/^I should see landing view$/, function() {
    let isLandingContentVisible = client.waitForVisible("#landing-content", 2000);
    expect(isLandingContentVisible).to.equal(true);
  });

  this.Then(/^I should see home view$/, function() {
    let isHomeContentVisible = client.waitForVisible("#home-content", 2000);
    expect(isHomeContentVisible).to.equal(true);
  });

  this.Then(/^I should see gallery view$/, function() {
    let isGalleryContentVisible = client.waitForVisible("#gallery-content", 2000);
    expect(isGalleryContentVisible).to.equal(true);
  });

  this.Given(/^my language is (.+)$/, function(language) {
    let lang = {
      language: "ja"
    };
    switch (language) {
      case "Japanese":
        lang.language = "ja";
        break;
      case "English":
        lang.language = "en";
        break;
      default:
        lang.language = "ja";
    }
    server.call('changeLanguage', lang);
  });

  this.When(/^I go to settings$/, function() {
    waitAndClickButton("#user-link");
    waitAndClickButton("#settings-link");
  });

  this.When(/^I change the language to (.+)$/, function(language) {
    let lang = "ja";
    switch (language) {
      case "Japanese":
        lang = "日本語";
        break;
      case "English":
        lang = "English";
        break;
      default:
        lang = "日本語";
    }
    waitAndClickButton('.select-dropdown');
    client.moveToObject(`span=${lang}`);
    client.click(`span=${lang}`);
  });

  this.When(/^I submit settings form$/, function() {
    client.submitForm("#accountForm");
  });

  this.Then(/^my language should be (.+)$/, function(language) {
    this.userProfile = server.execute(()=>{
      return Meteor.user().profile;
    });
    let lang = "ja";
    switch (language) {
      case "Japanese":
        lang = "ja";
        break;
      case "English":
        lang = "en";
        break;
      default:
        lang = "ja";
    }
    expect(this.userProfile.language).to.equal(lang);
  });
};
