import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const memoClicked = new Mongo.Collection('memoClicked');

var Schemas = {};

Schemas.memoClicked = new SimpleSchema({
	userId:{
		type:String,
		optional:true,
	},
	labelId:{
		type:String,
		optional:true,
	},
	memoId:{
		type:String,
		optional:true,
	},
	labelName:{
		type:String,
		optional:true,
	},
	clickedAt:{
		type:Date,
		optional:true,
	},
});

memoClicked.attachSchema(Schemas.memoClicked);