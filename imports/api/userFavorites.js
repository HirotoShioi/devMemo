import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { moment } from 'meteor/momentjs:moment';

export const userFavorites = new Mongo.Collection('userFavorites');

let Schemas = {};

Schemas.userFavorites = new SimpleSchema({
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
  favoritedAt: {
    type: Date,
    optional: true,
    autoValue: function() {
      return moment().toDate();
    }
  },
});

userFavorites.attachSchema(Schemas.userFavorites);

Meteor.methods({
  toggleFavorite(memoId) {
    check(memoId, String);
    if (!this.userId) {
      throw new Meteor.Error("notAuthorized");
    }
    // if find, remove favoritedAt
    const isFavorited = userFavorites.findOne({userId: this.userId, memoId: memoId});
    if (isFavorited) {
      userFavorites.remove({_id: isFavorited._id});
    } else {
      userFavorites.insert({memoId: memoId});
    }
  },
});
