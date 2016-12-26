import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { i18n } from 'meteor/anti:i18n';
let Schema = {};

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
    optional: true,
    defaultValue: "ja",
    allowedValues: ["ja", "en"],
  }
});

Schema.User = new SimpleSchema({
  username: {
    type: String,
    optional: true,
    unique: true,
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
  }
});

Meteor.methods({
  changeUserSettings(doc) {
    check(doc, Object);
    if (!Meteor.userId()) {
      throw new Meteor.Error('not authorized');
    }
    const hasSameUsername = Meteor.users.findOne({username: doc.username});
    if (hasSameUsername) {
      if (Meteor.userId() !== hasSameUsername._id) {
        throw new Meteor.Error(i18n('settings.usernameExists'));
      }
    }
    Meteor.users.update({_id: this.userId}, {$set: {username: doc.username, 'profile.language': doc.language}});
  }
});
