import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Schema = {};

Schema.userSettings = new SimpleSchema({
	memoExpireIn:{
		type: Number,
		optional:true,
		autoValue:function(){
			return 3;
		},
	},
	recentChosenLabel:{
		type:String,
		optional:true,
	},
});
Schema.User = new SimpleSchema({
	username:{
		type: String,
		optional: true,
	},
	emails:{
		type:Array,
		optional:true,
	},
	 "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
	createdAt:{
		type: Date,
		optional: true,
		autoValue:function(){
			return new Date();
		},
	},
	profile:{
		type: Schema.userSettings,
		optional: true,
	},
	services:{
		type: Object,
		optional: true,
		blackbox: true,
	},
});

Meteor.users.attachSchema(Schema.User);

Meteor.users.helpers({
	profile(){
		return this.profile;
	}
});