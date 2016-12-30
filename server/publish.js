import { Meteor } from 'meteor/meteor';
import { Memos } from '../imports/api/memos.js';
import { Label } from '../imports/api/label.js';

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
