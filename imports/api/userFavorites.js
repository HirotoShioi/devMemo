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
    type: String,
    optional: true,
    autoValue: function() {
      return moment().toDate();
    }
  },
});

userFavorites.attachSchema(Schemas.userFavorites);
