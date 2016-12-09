import { TemplateController } from 'meteor/space:template-controller';
import './SideNav.html';
import './NewMemoModal.js';
import { Memos } from '../../api/memos.js';
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
			$('#afModal').closeModal();
			Session.set('labelBarShow', false);
			Session.set('isSearching', !Session.get('isSearching'));
		},
		'click .label-link'(){
			$('#afModal').closeModal();
			Session.set('isSearching', false);
			Session.set('labelBarShow',!Session.get('labelBarShow'));
		},
		'click .side-nav'(){
			Session.set('labelFormShow',false);
		}
	}
});