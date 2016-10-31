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

//publication for the board
Meteor.publishComposite('statusBoard',{
	find:function(){
		return Status.find({owner:this.userId});
	},
	children:[
		{
			find:function(status){
				return Memos.find({ owner:this.userId, statusId:status._id},{sort:{createdAt:-1}});
			}
		},
	]
});