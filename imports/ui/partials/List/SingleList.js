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
	Url(){
		return `http://www.google.com/s2/favicons?domain=${this.url}`;
	}
});
Template.SingleList.events({
	'click .fa-close'(){
		Meteor.call('deleteMemo',this._id);
	},
});