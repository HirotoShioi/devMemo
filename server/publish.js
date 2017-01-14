import { Meteor } from 'meteor/meteor';
import { Memos } from '../imports/api/memos.js';
import { Label } from '../imports/api/label.js';
import { labelShare } from '../imports/api/labelShare.js';
import { userFavorites } from '../imports/api/userFavorites.js';

import { check, Match } from 'meteor/check';

// Single memo
Meteor.publish('singleMemo', function(id) {
  check(id, String);
  return Memos.find({_id: id});
});

// all user's username
Meteor.publish('usernames', function() {
  return Meteor.users.find({}, {fields: {username: 1}});
});

// all user's favorites
Meteor.publish('userFavorites', function() {
  return userFavorites.find({userId: this.userId});
});

// publish all memos label shares labels
Meteor.publishComposite('MemoLabelShares', {
  find: function() {
    return labelShare.find({$or: [{sharedTo: this.userId, status: {$ne: "denied"}}, {sharedFrom: this.userId}]});
  },
  children: [
    {
      // Find label that is user's and shared
      find: function(label) {
        // Transform function
        // Add field isShared to indicate which label is shared
        const transform = function(doc) {
          if (doc._id === label.labelId && label.status === "accepted") {
            doc.isShared = true;
          }
          return doc;
        };

        const self = this;

        let observer = Label.find({$or: [{owner: this.userId}, {_id: label.labelId}]}).observe({
          added: function(document) {
            self.added('Label', document._id, transform(document));
          },
          changed: function(newDocument, oldDocument) {
            self.changed('Label', oldDocument._id, transform(newDocument));
          },
          removed: function(oldDocument) {
            self.removed('Label', oldDocument._id);
          }
        });

        self.onStop(function() {
          observer.stop();
        });

        self.ready();
        return Label.find({$or: [{owner: this.userId}, {_id: label.labelId}]});
      }
    },
    {
      // Find memos that is user's and shared
      find: function(label) {
        return Memos.find({$or: [{owner: this.userId}, {labelId: label.labelId}]});
      },
    },
    {
      // Get other users that is sharing same label
      find: function(label) {
        return labelShare.find({labelId: label.labelId});
      }
    }
  ]
});

// Not used but saved if there's any problem with publish composite

// label publication
Meteor.publish('label', function() {
  return Label.find({owner: this.userId});
});

// Memo publication with query options
Meteor.publish('memos', function() {
  let query    = { owner: this.userId };
  let projection = { limit: 100, sort: { createdAt: -1 } };

  return Memos.find(query, projection);
});

// labelShare publication(request)
Meteor.publish('labelShare', function() {
  labelShare.find({$or: [{sharedTo: this.userId}, {sharedFrom: this.userId}]});
});

