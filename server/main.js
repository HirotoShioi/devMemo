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
});
