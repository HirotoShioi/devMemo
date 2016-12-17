import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Memos } from './memos.js';

export const Label = new Mongo.Collection('Label');

Label.allow({
	update:function(userId,doc){
		if(Meteor.user().profile.defaultLabelId == doc._id){
			return false;
		}
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
		max:10,
	},
    name_sort: {
        type: String,
        optional: true,
        autoValue: function() {
            var name = this.field("name");
            if (name.isSet) {
                return name.value.toLowerCase();
            } else {
                this.unset();
            }
        }
    },
	color:{
		type:String,
		optional:true,
		defaultValue:"#e4e4e4",
		regEx:/^#([0-9a-f]{6}|[0-9a-f]{3})$/i,
	},
	createdAt:{
		type:Date,
		autoValue:function(){
			return new Date();
		},
	},
	owner:{
		type:String,
		autoValue:function(){
			return Meteor.userId();
		},
	},
	username:{
		type:String,
		autoValue:function(){
			return Meteor.user().username;
		},
	},
	canEdit:{
		type:Boolean,
		autoValue:function(){
			return true;
		},
	},
});

Label.attachSchema(Schemas.label);
Meteor.methods({
	'addLabel'(labelObj){
		check(labelObj , Object);

		if(!this.userId){
			throw new Meteor.Error("not authorized");
		}

		Label.insert({
			name:labelObj.name,
			color:labelObj.color,
			createdAt:new Date(),
			owner: Meteor.userId(),
			username: Meteor.user().username
		});
	},
	'removeLabel'(id){
		check(id,String);
		const label = Label.findOne(id);
		const defaultLabelId = Meteor.user().profile.defaultLabelId;
		if(this.userId !== label.owner || defaultLabelId == id){
			throw new Meteor.Error('not authorized');
		}

		Label.remove(id);
		Memos.update({labelId:id},
		{
			$unset:{labelId:""}
		},{multi:true});
	}
});

Label.helpers({
	memos(){
		return Memos.find({labelId:this._id});
	},
	memoCount(){
		return Memos.find({labelId:this._id}).count();
	}
});