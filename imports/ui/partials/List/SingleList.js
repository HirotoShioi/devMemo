import './SingleList.html';

import { Template } from 'meteor/templating';
import { Status } from '../../../api/status.js';

Template.SingleList.onCreated(function(){
	this.autorun(()=>{
		this.subscribe('status');
	});
});

Template.SingleList.helpers({
	uniqueId(){
		return this._id;
	},
	isOwner(){
		return (Meteor.userId() === this.owner);
	},
});
Template.SingleList.events({
	'click .fa-close'(){
		Meteor.call('deleteMemo',this._id);
	},
});