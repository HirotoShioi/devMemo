import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

import { Label } from './label.js';

export const Memos = new Mongo.Collection('memos');

var Schemas = {};

Memos.allow({
	update:function(userId,doc){
		return !!userId;
	}
});
//schemas
Schemas.memos = new SimpleSchema({
	name:{
		type:String,
		label:"Name",
		optional:true,
		autoform:{
			type:"hidden"
		},
	},
	url:{
		type:String,
		label:"URL",
		regEx:SimpleSchema.RegEx.Url
	},
	thumbnailUrl:{
		type:String,
		optional:true,
		autoform:{
			type:"hidden"
		}
	},
	desc:{
		type:String,
		label:"Description",
		optional:true,
		autoform:{
			type:"hidden"
		}
	},
	isFavorited:{
		type:Boolean,
		optional:true,
		defaultValue:false,
		autoform:{
			type:"hidden"
		}
	},
	tags:{
		type:String,
		label:"Tag",
		optional:true
	},
	labelId: {
    	type: String,
    	label:"Label",
    	optional:true,
    	autoform: {
	        type: "select-radio",
	        options: function () {
	            return Label.find({owner:Meteor.userId()},{sort:{createdAt:-1}}).map(function (c) {
	                return {label: c.name, value: c._id};
	            });
        	}
    	}
	},
	createdAt:{
		type:Date,
		optional:true,
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
	updateFavorite(data){
		let isFavorited = data.isFavorited;
		if(isFavorited === undefined){
			isFavorited = false;
		}
		Memos.update({_id:data._id},{$set:{isFavorited:!data.isFavorited}});
	},
	addMemo(doc){
		if(Meteor.isServer){
			const result = HTTP.call('GET',"https://api.embedly.com/1/oembed",{
				params:{
					key:Meteor.settings.embedApiKey,
					url:doc.url}
			});
			console.log(result);
			const data = result.data;
			Memos.insert({
				name:data.title,
				url:doc.url,
				thumbnailUrl:data.thumbnail_url,
				desc:data.description,
				labelId:doc.labelId,
				createdAt: Date.now(),
				owner: this.userId,
				username:Meteor.userId(),
			});
		}
	}
});

Memos.helpers({
	label(){
		return Label.findOne(this.labelId);
	}
});

