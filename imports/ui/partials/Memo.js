import './Memo.html';

import { Template } from 'meteor/templating';
import { Status } from '../../api/status.js';

Template.Memo.onCreated(function(){
	this.autorun(()=>{
		this.subscribe('status');
	});
});

Template.Memo.helpers({
	uniqueId(){
		return this._id;
	},
	isOwner(){
		return (Meteor.userId() === this.owner);
	},
});
Template.Memo.events({
	'click .fa-close'(){
		Meteor.call('deleteMemo',this._id);
	},
});
