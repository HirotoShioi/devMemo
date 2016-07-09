import './Header.html';

import { Template } from 'meteor/templating';

Template.Header.onRendered(function(){

});

Template.Header.helpers({
	title:()=>{
		return Session.get('Title');
	}
});

Template.Header.events({
	'click .toggle-sidenav'(){
		Session.set('sideNav',!Session.get('sideNav'));
	},
	'click #slide-out a'(){
		Session.set('sideNav',false);
	},
	'click .logout':()=>{
		Meteor.logout();
	}
});