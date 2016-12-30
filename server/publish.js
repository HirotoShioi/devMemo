import { Meteor } from 'meteor/meteor';
import { Memos } from '../imports/api/memos.js';
import { Label } from '../imports/api/label.js';
import { labelShare } from '../imports/api/labelShare.js';
import { check, Match } from 'meteor/check';

Meteor.publish('singleMemo', function(id) {
  check(id, String);
  return Memos.find({_id: id});
});

Meteor.publish('memoWithLabels', function(id) {
  check(id, String);
  return Memos.find({labelId: id});
});

// label publication
Meteor.publish('label', function() {
  return Label.find({owner: this.userId});
});
// Memo publication with query options
Meteor.publish('memos', function(search) {
  check( search, Match.OneOf( String, null, undefined ) );

  let query      = { owner: this.userId },
      projection = { limit: 100, sort: { createdAt: -1 } };

  if ( search ) {
    let regex = new RegExp( search, 'i' );
    query.name = regex;
  }
  return Memos.find(query, projection);
});

// User publication
Meteor.publish('allUser', function() {
  return Meteor.users.find({}, {fields: {username: 1}});
});

// labelShare publication(request)
Meteor.publish('labelShare', function() {

  // Transform function
  const transform = function(doc) {
    const label = Label.findOne({_id: doc.labelId});
    doc.labelName = label.name;
    doc.labelColor = label.color;
    return doc;
  };

  const self = this;

  let observer = labelShare.find({sharedTo: this.userId}).observe({
    added: function(document) {
      self.added('labelShare', document._id, transform(document));
    },
    changed: function(newDocument, oldDocument) {
      self.changed('labelShare', oldDocument._id, transform(newDocument));
    },
    removed: function(oldDocument) {
      self.removed('labelShare', oldDocument._id);
    }
  });

  self.onStop(function() {
    observer.stop();
  });

  self.ready();
});

