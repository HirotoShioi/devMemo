import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { moment } from 'meteor/momentjs:moment';
import { Label } from './label.js';

export const labelShare = new Mongo.Collection('labelShare');
let Schema = {};

Schema.labelShare = new SimpleSchema({
  requestSentAt: {
    type: Date,
    optional: true,
  },
  acceptedAt: {
    type: Date,
    optional: true,
  },
  deniedAt: {
    type: Date,
    optional: true,
  },
  sharedFrom: {
    type: String,
    optional: true,
  },
  sharedTo: {
    type: String,
    optional: true,
  },
  labelId: {
    type: String,
    optional: true,
  },
  requestNotified: {
    type: Boolean,
    defaultValue: false,
    optional: true,
  },
  respondNotified: {
    type: Boolean,
    optional: true,
  },
  status: {
    type: String,
    optional: true,
    defaultValue: "pending",
    allowedValues: ["pending", "denied", "accepted"],
  },
  message: {
    type: String,
    optional: true,
  },
});

labelShare.attachSchema(Schema.labelShare);


labelShare.helpers({
  isPending() {
    return (this.pending === "pending");
  },
  isDenied() {
    return (this.pending === "denied");
  },
  isAccepted() {
    return (this.pending === "accepted");
  }
});

Meteor.methods({
  requestUser(doc) {
    check(doc, Object);

    const sharedLabel = Label.findOne({_id: doc.labelId});
    if (this.userId !== sharedLabel.owner) {
      throw new Meteor.Error('notAuthorized');
    }

    const requestedUser = Meteor.users.findOne({username: doc.username});
    if (!requestedUser) {
      throw new Meteor.Error("userDoesNotExist");
    }
    // if there was already a same request, reject it
    const isAlreadyRequested = labelShare.find({
      sharedFrom: this.userId,
      sharedTo: requestedUser._id,
      labelId: doc.labelId,
      status: {$ne: "denied"}}).count();

    if (isAlreadyRequested > 0) {
      throw new Meteor.Error("requestAlreadySent");
    }
    requestAlreadyDeniedQuery = {
      sharedFrom: this.userId,
      sharedTo: requestedUser._id,
      labelId: doc.labelId,
      status: "denied"
    };
    const requestAlreadyDenied = labelShare.find(requestAlreadyDeniedQuery).count();
    if (requestAlreadyDenied > 0)  {
      labelShare.remove(requestAlreadyDeniedQuery);
    }
    labelShare.insert({
      sharedFrom: this.userId,
      sharedTo: requestedUser._id,
      labelId: doc.labelId,
      requestSentAt: moment().toDate(),
      status: "pending",
      requestNotified: false,
      message: doc.message,
    });
    return true;
  },
  cancelRequest(id) {
    check(id, String);
    const sharedLabel = labelShare.findOne({_id: id});

    if (this.userId !== sharedLabel.sharedFrom) {
      throw new Meteor.Error('notAuthorized');
    }

    labelShare.remove({_id: id});
  },
  acceptShare(id) {
    check(id, String);

    const sharedLabel = labelShare.findOne({_id: id});

    if (this.userId !== sharedLabel.sharedTo) {
      throw new Meteor.Error('notAuthorized');
    }

    labelShare.update({_id: id}, {$set: {
      status: "accepted",
      requestNotified: true,
      acceptedAt: moment().toDate(),
      respondNotified: false,
    }});
  },
  denyShare(id) {
    check(id, String);

    const sharedLabel = labelShare.findOne({_id: id});

    if (this.userId !== sharedLabel.sharedTo) {
      throw new Meteor.Error('notAuthorized');
    }

    labelShare.update({_id: id}, {$set: {
      status: "denied",
      requestNotified: true,
      deniedAt: moment().toDate(),
      respondNotified: false,
    }});
  },
  leaveSharedLabel(labelId) {
    check(labelId, String);

    if (!this.userId) {
      throw new Meteor.Error('notAuthorized');
    }

    labelShare.remove({sharedTo: this.userId, labelId: labelId});
  },
  requestNotified() {
    labelShare.update({sharedTo: this.userId}, {$set: {requestNotified: true}}, {multi: true});
    labelShare.update({sharedFrom: this.userId}, {$set: {respondNotified: true}}, {multi: true});
  }
});
