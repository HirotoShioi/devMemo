import './Header.html';
import { TemplateController } from 'meteor/space:template-controller';
import './SearchBar/SearchNavBar.js';
TemplateController('Header',{
	helpers:{
		title(){
			return Session.get('Title');
		},
	},

	events:{
		'click .toggle-sidenav'(){
			Session.set('isShrinkedSideNavShown',!Session.get('isShrinkedSideNavShown'));
		},
		'click #slide-out a'(){
			Session.set('isShrinkedSideNavShown',false);
		},
		'click .logout'(){
			AccountsTemplates.logout();
		},
		'click .fa-search'(){
			Session.set('isSearchNavShown',true);
		}
	}
});