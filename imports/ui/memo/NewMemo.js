import { Template } from 'meteor/templating';

import './NewMemo.html';

import {Status} from '../../api/status.js';

Template.NewMemo.onCreated(function(){
	this.autorun(()=>{
		this.subscribe('status');
	});
	this.addMemo = new ReactiveVar(false);
});

Template.NewMemo.helpers({
	options(){
		const status = Status.find({});
		let statusAry = [];
		status.forEach((stat) =>{
			statusAry.push({label:stat.name,value:stat._id});
		});
		return statusAry;
	},
	addMemo(){
		return Template.instance().addMemo.get();
	}
});

Template.NewMemo.events({
	'click .new-memo-show'(){
		Template.instance().addMemo.set(true);
	},
	'click .new-memo-hide'(){
		Template.instance().addMemo.set(false);
	}
});
const hooksObject = {
	onSuccess:(formType,result)=>{
		Bert.alert({
		  title: 'Memo Added',
		  type: 'info',
		  style: 'growl-top-right',
		  icon: 'fa-sticky-note'
		});
		Session.set('newMemo',false);
	},
}

AutoForm.hooks({
  insertNewMemoForm: hooksObject
});