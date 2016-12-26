import { Meteor } from 'meteor/meteor';
import { SyncedCron } from 'meteor/percolate:synced-cron';
// collections
import '../imports/api/memos.js';
import '../imports/api/memoClicked.js';
import '../imports/api/label.js';

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
        "clientId": "d20c465d930da340c1d1",
        "secret": "08c2c0d1ed41697fb3cf739c4297db8b3a00080b"
      }
    },
    { upsert: true }
  );
});
