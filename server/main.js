import { Meteor } from 'meteor/meteor';
import { SyncedCron } from 'meteor/percolate:synced-cron';
// collections
import '../imports/api/memos.js';
import '../imports/api/memoClicked.js';
import '../imports/api/label.js';
import '../imports/api/labelShare.js';
import '../imports/api/user.js';

// jobs
SyncedCron.add({
  name: 'Find expired memos',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.text('every 5 seconds');
  },
  job: function() {
    Meteor.call('checkExpiration');
  }
});

Meteor.startup(function() {
  SyncedCron.start();
  // Add GitHub configuration entry
  ServiceConfiguration.configurations.update(
    { "service": "github" },
    {
      $set: {
        "clientId": Meteor.settings.private.oAuth.github.clientId,
        "secret": Meteor.settings.private.oAuth.github.secret
      }
    },
    { upsert: true }
  );

  ServiceConfiguration.configurations.update(
    { "service": "facebook" },
    {
      $set: {
        "appId": Meteor.settings.private.oAuth.facebook.appId,
        "secret": Meteor.settings.private.oAuth.facebook.secret
      }
    },
    { upsert: true }
  );

  ServiceConfiguration.configurations.update(
    { "service": "google" },
    {
      $set: {
        "clientId": Meteor.settings.private.oAuth.google.clientId,
        "secret": Meteor.settings.private.oAuth.google.secret
      }
    },
    { upsert: true }
  );
});
