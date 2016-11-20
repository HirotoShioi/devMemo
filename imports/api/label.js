import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Memos } from './memos.js';

export const Label = new Mongo.Collection('Label');

Label.allow({
	update:function(userId,doc){
		return !!userId;
	},
	remove:function(userId,doc){
		Memos.update({labelId:doc._id},{
			$unset:{labelId:""}
		},{multi:true});
		return !!userId;
	}
});

var Schemas = {};

Schemas.label = new SimpleSchema({
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
	},
});

Label.attachSchema(Schemas.label);
Meteor.methods({
	'addLabel'(name){
		check(name,String);

		if(!this.userId){
			throw new Meteor.Error("not authorized");
		}

		Label.insert({
			name,
			createdAt:new Date(),
			owner: Meteor.userId(),
			username: Meteor.user().username
		});
	},
	'removeLabel'(id){
		check(id,String);
		const label = Label.find({_id:id});

		if(this.userId !== label.owner){
			throw new Meteor.Error('not authorized');
		}

		Label.remove(id);
		Memos.update({labelId:id},
		{
			$unset:{labelId:""}
		});
	}
});

Label.helpers({
	memos(){
		return Memos.find({labelId:this._id});
	},
});