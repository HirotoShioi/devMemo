import { Meteor } from 'meteor/meteor';
import { Memos } from '../imports/api/memos.js';
import { Label } from '../imports/api/label.js';
import { labelShare } from '../imports/api/labelShare.js';
import { check, Match } from 'meteor/check';

Meteor.publish('singleMemo', function(id) {
  check(id, String);
  return Memos.find({_id: id});
});


// label publication
Meteor.publish('label', function(sharedLabelAry) {
  let queryArray = [
    {owner: this.userId}
  ];

  if (sharedLabelAry !== undefined) {
    sharedLabelAry.forEach((label) =>{
      queryArray.push(label);
    });
  }

  return Label.find({$or: queryArray});
});

// Memo publication with query options
Meteor.publish('memos', function(sharedLabelAry) {
  let queryArray      = [{ owner: this.userId }];
  let projection = { limit: 100, sort: { createdAt: -1 } };

  if (sharedLabelAry !== undefined) {
    sharedLabelAry.forEach((label) =>{
      queryArray.push({labelId: label._id});
    });
  }

  return Memos.find({$or: queryArray}, projection);
});

// labelShare publication(request)
Meteor.publish('labelShare', function() {

  // Transform function
  const transform = function(doc) {
    const label = Label.findOne({_id: doc.labelId});
    doc.labelName = label.name;
    doc.labelColor = label.color;

    const user = Meteor.users.findOne({_id: doc.sharedFrom });
    doc.username = user.username;

    const requestUser = Meteor.users.findOne({_id: doc.sharedTo});
    doc.requestUsername = requestUser.username;
    return doc;
  };

  const self = this;
  let observer = labelShare.find({$or: [{sharedTo: this.userId}, {sharedFrom: this.userId}]}).observe({
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

// shares
Meteor.publishComposite('shares', {
  find: function() {
    let acceptedLabels = labelShare.find({$or: [{sharedTo: this.userId, status: "accepted"}, {sharedFrom: this.userId, status: "accepted"}]});
    queryArray = [];
    acceptedLabels.forEach((label)=>{
      queryArray.push({labelId: label.labelId});
    });
    return labelShare.find({$or: queryArray});
  },
  children: [
    {
      find: function(label) {
        // Transform function
        const transform = function(doc) {
          if (doc._id === label.labelId) {
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
      }
    },
    {
      find: function(label) {
          // Find top two comments on post
        return Memos.find({$or: [{owner: this.userId}, {labelId: label.labelId}]});
      },
    }
  ]
});

// all user's username
Meteor.publish('usernames', function() {
  return Meteor.users.find({}, {fields: {username: 1}});
});
