import './ViewBtn.html';

import { Template } from 'meteor/templating';

Template.ViewBtn.events({
	'click .card-view'(){
		Session.set('ListMode',false);
	},
	'click .list-view'(){
		Session.set('ListMode',true);
	}
});