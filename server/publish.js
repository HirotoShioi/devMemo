import { Meteor } from 'meteor/meteor';
import { Memos } from '../imports/api/memos.js';
import { Label } from '../imports/api/label.js';

//Memos Publication
Meteor.publish('memos',function(){
	return Memos.find({owner:this.userId});
});

Meteor.publish('singleMemo',function(id){
	return Memos.find({_id:id});
});

//label publication
Meteor.publish('label', function(){
	return Label.find({owner:this.userId});
});

//publication for the board
Meteor.publishComposite('labelBoard',{
	find:function(){
		return Label.find({owner:this.userId});
	},
	children:[
		{
			find:function(label){
				return Memos.find({ owner:this.userId, statusId:label._id},{sort:{createdAt:-1}});
			}
		},
	]
});