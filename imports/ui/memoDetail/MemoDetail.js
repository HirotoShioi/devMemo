import './MemoDetail.html';
import { Template } from 'meteor/templating';

import { Memos } from '../../api/memos.js';

Template.MemoDetail.onCreated(function(){
 	const self = this;
 	self.autorun(function(){
 		const id = Template.instance().data._id;
 		self.subscribe('singleMemo',id);
 		Session.set('Title',Memos.findOne({_id:id},{fields:{'name':1}}));
 	});
});

Template.MemoDetail.helpers({
	memo:()=>{
		const id = Template.instance().data._id;
		return Memos.findOne({_id:id});
	}
});