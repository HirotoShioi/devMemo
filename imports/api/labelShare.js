import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { i18n } from 'meteor/anti:i18n';
import { Meteor } from 'meteor/meteor';

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
  rejectedAt: {
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
  status: {
    type: String,
    optional: true,
    defaultValue: "pending",
    allowedValues: ["pending", "rejected", "accepted"],
  }
});

labelShare.attachSchema(Schema.labelShare);


labelShare.helpers({
  isPending() {
    return (this.pending === "pending") ? true : false;
  },
  isRejected() {
    return (this.pending === "rejected") ? true : false;
  },
  isAccepted() {
    return (this.pending === "accepted") ? true : false;
  }
});

Meteor.methods({
  requestUser(doc) {
    check(doc, Object);
    if (!this.userId) {
      throw new Meteor.Error('not authorized');
    }
    const requestedUser = Meteor.users.findOne({username: doc.username});
    if (!requestedUser) {
      return false;
    }
    // if there was already a same request, reject it
    const isAlreadyRequested = labelShare.find({
      sharedFrom: this.userId,
      sharedTo: requestedUser._id,
      labelId: doc.labelId}).count();

    if (isAlreadyRequested > 0) {
      return false;
    }

    labelShare.insert({
      sharedFrom: this.userId,
      sharedTo: requestedUser._id,
      labelId: doc.labelId,
      requestSentAt: moment().toDate(),
      status: "pending",
    });
    return true;
  },
});
