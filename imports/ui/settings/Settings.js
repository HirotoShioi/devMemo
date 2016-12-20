import { TemplateController } from 'meteor/space:template-controller';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import '../layouts/component/PageTitle';

import './Settings.html';

TemplateController('Settings', {
  onCreated() {
    Session.set('Title', {name: "Settings"});
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
          optional: true,
          allowedValues: ["ja", "en"],
          autoform: {
            type: "select",
            options: [
              {label: "Japanese", value: "ja"},
              {label: "English", value: "en"},
            ]
          },
        }
      });
      return schema;
    },
  }
});
