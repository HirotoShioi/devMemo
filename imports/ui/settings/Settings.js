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
      return Meteor.user().profile;
    },
    schema() {
      const schema = new SimpleSchema({
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
