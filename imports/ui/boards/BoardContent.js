import './BoardContent.html';

import { Template } from 'meteor/templating';

import { Status }  from '../../api/status.js';

import '../partials/Memo.js';
Template.BoardContent.onCreated(function(){
	this.autorun(()=>{
		this.subscribe('status');
	});
	this.editMode = new ReactiveVar(false);
});

Template.BoardContent.helpers({
	editMode:()=>{
		return Template.instance().editMode.get();
	}
});

Template.BoardContent.events({
	'click .remove-status'(){
		Meteor.call('removeStatus',this._id,(err,result)=>{
			if(err){
				Bert.alert( 'Cannot delete last status', 'danger', 'growl-top-right' );
			}
		});
	},
	'click .toggle-status-option'(){
		Template.instance().editMode.set(!Template.instance().editMode.get());
	},
});
