import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

import { Status } from './status.js';

export const Memos = new Mongo.Collection('memos');

var Schemas = {};

Memos.allow({
	insert:function(userId,doc){
		return !!userId;
	},
	update:function(userId,doc){
		return !!userId;
	}
});
//schemas
Schemas.memos = new SimpleSchema({
	name:{
		type:String,
		label:"Name",
	},
	url:{
		type:String,
		label:"URL",
		regEx:SimpleSchema.RegEx.Url
	},
	desc:{
		type:String,
		label:"Description"
	},
	statusId: {
    type: String,
    regEx:SimpleSchema.RegEx.Id,
    autoform: {
        type: "select-radio",
        options: function () {
            return Status.find({owner:Meteor.userId()},{sort:{createdAt:-1}}).map(function (c) {
                return {label: c.name, value: c._id};
            });
        }
    }
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
Memos.attachSchema(Schemas.memos);

//Methods
Meteor.methods({
	deleteMemo(id){
		Memos.remove(id);
	},
});

Memos.helpers({
	status(){
		return Status.findOne(this.statusId);
	}
});


