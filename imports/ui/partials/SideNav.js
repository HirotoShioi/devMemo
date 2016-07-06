import { Template } from 'meteor/templating';

import './SideNav.html';
import './NewMemoModal.js';

Template.SideNav.events({
	'click .logout':()=>{
		Meteor.logout();
	}
});