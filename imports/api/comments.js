import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { moment } from 'meteor/momentjs:moment';

export const Comments = new Mongo.Collection('Comments');

let Schemas = {};

Schemas.comments = new SimpleSchema({
  userId: {
    type: String,
    optional: true,
    autoValue: function() {
      return this.userId;
    }
  },
  memoId: {
    type: String,
    optional: true,
  },
  comment: {
    type: String,
    min: 1,
    max: 140,
  },
  commentedAt: {
    type: Date,
    optional: true,
    autoValue: function() {
      return moment().toDate();
    }
  },
});

Comments.attachSchema(Schemas.comments);

Meteor.methods({
  'addComment'(comment, memoId) {
    check(comment, String);
    check(memoId, String);

    if (!this.userId) {
      throw new Meteor.Error("notAuthorized");
    }
    Comments.insert({
      userId: this.userId,
      memoId: memoId,
      comment: comment,
    });
  },
  'deleteComment'(commentId) {
    check(commentId, String);

    const comment = Comments.findOne({_id: commentId});
    if (this.userId !== comment.userId) {
      throw new Meteor.Error("notAuthorized");
    }

    Comments.remove({_id: commentId});
  }
});
