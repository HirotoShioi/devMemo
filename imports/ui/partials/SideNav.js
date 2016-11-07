import { TemplateController } from 'meteor/space:template-controller';
import './SideNav.html';
import './NewMemoModal.js';

TemplateController('SideNav',{
	events:{
		'click .logout'(){
			Meteor.logout();
		},
	}
});