import { Meteor } from 'meteor/meteor';
import { Memos } from '../imports/api/memos.js';
import { Label } from '../imports/api/label.js';
import { check, Match } from 'meteor/check';
//Memos Publication
Meteor.publish('memos',function(){
	return Memos.find({owner:this.userId});
});

Meteor.publish('singleMemo',function(id){
	return Memos.find({_id:id});
});

Meteor.publish('memoWithLabels', function(id){
	return Memos.find({labelId:id});
});

//label publication
Meteor.publish('label', function(){
	return Label.find({owner:this.userId});
});

//publication for the board
Meteor.publishComposite('labelWithMemos',{
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

//searchQuery
Meteor.publish('searchMemo',function(search){
  check( search, Match.OneOf( String, null, undefined ) );

  let query      = {},
      projection = { limit: 10, sort: { createdAt: -1 } };

  if ( search ) {
    let regex = new RegExp( search, 'i' );
    console.log(regex);
    projection.limit = 10;
    return Memos.find({name:search},projection);
  }

  //return Memos.find( query, projection );
});