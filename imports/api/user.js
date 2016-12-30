import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { i18n } from 'meteor/anti:i18n';
let Schema = {};

Meteor.users.allow({
  update: function(userId) {
    return !!userId;
  }
});

Schema.userSettings = new SimpleSchema({
  memoExpireIn: {
    type: Number,
    optional: true,
    autoValue: function() {
      return 3;
    },
  },
  recentChosenLabel: {
    type: String,
    optional: true,
  },
  language: {
    type: String,
    label: function() {return i18n("settings.language.label");},
    optional: true,
    defaultValue: "ja",
    allowedValues: ["ja", "en"],
    autoform: {
      type: "select",
      options: [
        {label: "日本語", value: "ja"},
        {label: "English", value: "en"},
      ]
    },
  }
});

Schema.User = new SimpleSchema({
  username: {
    type: String,
    regEx: /^[a-z0-9A-Z_]{3,15}$/,
    optional: true,
    label: function() {return i18n("settings.username.label");},
    unique: true,
    custom: function() {
      if (Meteor.isClient && this.isSet) {
        Meteor.call("isUsernameAvailable", this.value, function(error, result) {
          if (!result) {
            const errorText = `usernameExists-${i18n.getLanguage()}`;
            Meteor.users.simpleSchema().namedContext("accountForm").addInvalidKeys([{name: "username", type: errorText}]);
          }
        });
      }
    }
  },
  emails: {
    type: Array,
    optional: true,
  },
  "emails.$": {
    type: Object
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
    type: Boolean
  },
  createdAt: {
    type: Date,
    optional: true,
    autoValue: function() {
      return new Date();
    },
  },
  profile: {
    type: Schema.userSettings,
    optional: true,
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true,
  },
});

Meteor.users.attachSchema(Schema.User);

Meteor.users.helpers({
  profile() {
    return this.profile;
  },
  lang() {
    return this.profile.language || 'ja';
  },
  hasUserName() {
    return (this.username) ? true : false;
  },
  userName() {
    return this.username;
  }
});

Meteor.methods({
  isUsernameAvailable(username) {
    check(username, String);
    const hasSameUsername = Meteor.users.findOne({username: username});
    if (hasSameUsername) {
      if (Meteor.userId() !== hasSameUsername._id) {
        return false;
      }
    }
    return true;
  },
});

SimpleSchema.messages({
  "usernameExists-en": "Username already exists",
  "usernameExists-ja": "そのユーザー名は既に使用されています"
});
