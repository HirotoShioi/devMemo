import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const memoClicked = new Mongo.Collection('memoClicked');

let Schemas = {};

Schemas.memoClicked = new SimpleSchema({
  userId: {
    type: String,
    optional: true,
  },
  labelId: {
    type: String,
    optional: true,
  },
  memoId: {
    type: String,
    optional: true,
  },
  labelName: {
    type: String,
    optional: true,
  },
  clickedAt: {
    type: Date,
    optional: true,
  },
});

memoClicked.attachSchema(Schemas.memoClicked);
