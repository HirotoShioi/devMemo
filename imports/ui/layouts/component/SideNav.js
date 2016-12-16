import { TemplateController } from 'meteor/space:template-controller';
import './SideNav.html';
import '../../partials/AddMemoButton.js';
import { Memos } from '../../../api/memos.js';
import { AccountsTemplates } from 'meteor/useraccounts:core';

TemplateController('SideNav',{
	onCreated(){
		const self = this;
		self.autorun(()=>{
			self.subscribe('memos');
		});
	},

	helpers:{
		notificationCount(){
			notifyCount = Memos.find({notifiedToUser:false}).count();
			return notifyCount;
		},
	},

	events:{
		'click .logout'(){
			AccountsTemplates.logout();
		},
		'click .link'(){
			Session.set('isSearching', false);
			Session.set('labelBarShow', false);
		},
		'click .search-link'(){
			Session.set('labelBarShow', false);
			Session.set('isSearching', !Session.get('isSearching'));
		},
		'click .label-link'(){
			Session.set('isSearching', false);
			Session.set('labelBarShow',!Session.get('labelBarShow'));
		},
		'click .side-nav'(){
			Session.set('labelFormShow',false);
		}
	}
});