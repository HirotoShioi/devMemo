import { Meteor } from 'meteor/meteor';
import { Memos } from '../imports/api/memos.js';
import { Status } from '../imports/api/status.js';
//Memos Publication
Meteor.publish('memos',function(){
	return Memos.find({owner:this.userId});
});

Meteor.publish('singleMemo',function(id){
	return Memos.find({_id:id});
});

//status Publication
Meteor.publish('status',function(){
	return Status.find({owner:this.userId});
});