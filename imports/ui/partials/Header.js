import './Header.html';
import { TemplateController } from 'meteor/space:template-controller';

TemplateController('Header',{
	helpers:{
		title(){
			return Session.get('Title');
		},
	},

	events:{
		'click .toggle-sidenav'(){
			Session.set('sideNav',!Session.get('sideNav'));
		},
		'click #slide-out a'(){
			Session.set('sideNav',false);
		},
		'click .logout':()=>{
			Meteor.logout();
		},
	}
});