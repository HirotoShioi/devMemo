import { TemplateController } from 'meteor/space:template-controller';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { i18n } from 'meteor/anti:i18n';
import { Router } from 'meteor/iron:router';

import '../layouts/component/PageTitle';

import './Settings.html';

let Schema = {};
TemplateController('Settings', {
  onCreated() {
    Session.set('Title', {name: i18n("settings.title")});
  },

  onRendered() {
  },

  onDestroyed() {
    Session.set('isUsernameAvailable', null);
  },

  helpers: {
    needSettings() {
      if (Meteor.user()) {
        return !Meteor.user().hasUserName();
      } else {
        return false;
      }
    },
    doc() {
      return Meteor.user();
    },
  }
});
const hooksObject = {
  onSuccess: function() {
    Bert.alert({
      type: "success",
      message: i18n('settings.success'),
      style: "growl-top-right"
    });
    Router.go('memo.home');
  }
};

AutoForm.hooks({
  accountForm: hooksObject
});

