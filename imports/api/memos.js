import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { check } from 'meteor/check';
import { Label } from './label.js';
import { moment } from 'meteor/momentjs:moment';
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
	},
	url:{
		type:String,
		label:"URL",
		regEx:SimpleSchema.RegEx.Url
	},
	thumbnailUrl:{
		type:String,
		optional:true,
	},
	desc:{
		type:String,
		label:"Description",
		optional:true,
	},
	provider_url:{
		type:String,
		optional:true,
		regEx:SimpleSchema.RegEx.Url,	
	},
	provider_name:{
		type:String,
		optional:true,		
	},
	isFavorited:{
		type:Boolean,
		optional:true,
		defaultValue:false,
	},
	tags:{
		type:String,
		label:"Tag",
		optional:true
	},
	clicked:{
		type:Number,
		defaultValue:0,
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
	},
	expiredAt:{
		type:Date,
		optional:true,
	},
	clickedAt:{
		type:Date,
		optional:true,
	},
	expireIn:{
		type:Number,
		optional:true,
	},
	owner:{
		type:String,
		optional:true,
	},
	username:{
		type:String,
		optional:true,
	},
	notifiedToUser:{
		type:Boolean,
		optional:true,
	},
	status:{
		type:String,
		defaultValue:"active",
		optional:true,
	},
});
Memos.attachSchema(Schemas.memos);

const updateMemoExpiration = function(id){
	const expireIn = Meteor.user().profile.memoExpireIn;
	Memos.update({_id:id},{
		$set: {
			expiredAt: moment().add(expireIn,'days').format(),
			expireIn:expireIn,
			status:"active",
			clickedAt: Date.now(),
		},
		$unset:{
			notifiedToUser:'',
		}
});
};
//Methods
Meteor.methods({
	deleteMemo(id){
		check(id, String);

		const memo = Memos.findOne(id);

		if(this.userId !== memo.owner){
			throw new Meteor.Error('not authorized');
		}
		Memos.remove(id);
	},
	updateFavorite(doc){
		check(doc, Object);

		let isFavorited = doc.isFavorited;
		if(isFavorited === undefined){
			isFavorited = false;
		}

		//if false, turn to true and update expiredAt
		if(isFavorited == true){
			updateMemoExpiration(doc._id);
		}
		Memos.update({_id:doc._id},{$set:{isFavorited:!doc.isFavorited}});
	},
	memoUrlClicked(doc){
		check(doc, Object);

		if(this.userId !== doc.owner){
			throw new Meteor.Error("not authorized");
		}
		
		if(!doc.clicked){
			Memos.update({_id:doc._id},{$set: {clicked:1,}});
		}else{
			Memos.update({_id:doc._id},{$inc: {clicked:1}});
		}
		updateMemoExpiration(doc._id);
	},
	addMemo(doc){
		check(doc, Object);
		if(!this.userId){
			throw new Meteor.Error('not authorized');
		}

		if(Meteor.isServer){
			const expireIn = Meteor.user().profile.memoExpireIn;
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
				provider_url:data.provider_url,
				provider_name:data.provider_name,
				desc:data.description,
				labelId:doc.labelId,
				createdAt: moment().format(),
				expiredAt:moment().add(expireIn, 'days').format(),
				expireIn: expireIn,
				owner: Meteor.userId(),
				username:Meteor.user().username,
			});
		}

		//update user's recently used label
		Meteor.users.update({_id:this.userId},{$set:{'profile.recentChosenLabel':doc.labelId}});
	},
	checkNotify(){
		const today = moment().toDate();
		const findExpiredMemoQuery = {expiredAt:{"$lt":today}, status:"active" };
		const needNotificationMemoCount = Memos.find(findExpiredMemoQuery).count();
		console.log(`${needNotificationMemoCount} memos needs to be notified to users`);
		Memos.update(findExpiredMemoQuery,{$set:{status:"expired", notifiedToUser:false}},{multi:true});
	},
	expiredMemoNotified(){
		if(!this.userId){
			throw new Meteor.Error('not authorized');
		}
		Memos.update({owner:this.userId, notifiedToUser:false, status:"expired"}, {$set:{notifiedToUser:true}}, {multi:true});
	},
	archiveMemo(doc){
		if(this.userId !== doc.owner){
			throw new Meteor.Error("not authorized");
		}
		const today = moment().toDate();
		Memos.update({_id:doc._id},{$set:{expiredAt:today, status:"expired", isFavorited:false, notifiedToUser:true}});
	}
});

Memos.helpers({
	label(){
		return Label.findOne(this.labelId);
	}
});

