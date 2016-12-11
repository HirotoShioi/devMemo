import './Header.html';
import { TemplateController } from 'meteor/space:template-controller';
import './SearchBar/SearchNavBar.js';
import { Memos } from '../../api/memos.js';

TemplateController('Header',{

	onCreated(){
		const self = this;
		self.autorun(()=>{
			self.subscribe('memos');
		});
	},
	helpers:{
		title(){
			return Session.get('Title');
		},
		notificationCount(){
			notifyCount = Memos.find({notifiedToUser:false}).count();
			return notifyCount;
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
			Session.set('searchQuery','');
			Session.set('isSearchNavShown',true);
			return false;
		}
	}
});