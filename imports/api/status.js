import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Memos } from './memos.js';

export const Status = new Mongo.Collection('status');

var Schemas = {};

Schemas.status = new SimpleSchema({
	name:{
		type:String,
		label:"name",
		max:20
	},
	createdAt:{
		type:Date,
		autoValue:function(){
			return new Date();
		},
		autoform:{
			type:"hidden"
		}
	},
	owner:{
		type:String,
		autoValue:function(){
			return Meteor.userId();
		},
		autoform:{
			type:"hidden"
		}
	},
	username:{
		type:String,
		autoValue:function(){
			return Meteor.user().username;
		},
		autoform:{
			type:"hidden"
		}
	}
});

Status.attachSchema(Schemas.status);
Meteor.methods({
	'addStatus'(name){
		check(name,String);

		Status.insert({
			name,
			createdAt:new Date(),
			owner: Meteor.userId(),
			username: Meteor.user().username
		});
	},
	'removeStatus'(id){
		check(id,String);

		if(Status.find({owner:Meteor.userId()}).count() === 1){
			throw new Meteor.Error('Cannot remove the status');
		}

		Status.remove({_id:id});
		Memos.update({statusId:id},{
			$unset:{statusId:""}
		});
	}
});

Status.helpers({
	memos(){
		return Memos.find({statusId:this._id});
	},
});