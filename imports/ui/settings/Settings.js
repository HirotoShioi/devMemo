import { TemplateController } from 'meteor/space:template-controller';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { i18n } from 'meteor/anti:i18n';
import '../layouts/component/PageTitle';

import './Settings.html';

TemplateController('Settings', {
  onCreated() {
    Session.set('Title', {name: i18n("settings.title")});
  },

  onRendered() {
  },

  helpers: {
    doc() {
      return Meteor.user();
    },
    schema() {
      const schema = new SimpleSchema({
        username: {
          type: String,
          optional: true,
        },
        language: {
          type: String,
          label: i18n("settings.language.label"),
          optional: true,
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
      return schema;
    },
  }
});
const hooksObject = {
  onSubmit: function(insertDoc) {
    this.event.preventDefault();
    Meteor.call('changeUserSettings', insertDoc, (err, result)=>{
      if (err) {
        console.log(err);
        Bert.alert({
          type: "danger",
          message: i18n('settings.usernameExists'),
          style: "growl-top-right"
        });
      } else {
        Bert.alert({
          type: "success",
          message: i18n('settings.success'),
          style: "growl-top-right"
        });
      }
    });
    this.done();
  },
};
AutoForm.hooks({
  accountForm: hooksObject
});
