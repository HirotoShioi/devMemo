import { TemplateController } from 'meteor/space:template-controller';
import './SideNav.html';
import './NewMemoModal.js';
import { Memos } from '../../api/memos.js';
TemplateController('SideNav',{
	onCreated(){
		this.autorun(()=>{
			this.subscribe('memos');
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
		},
		'click .search-link'(){
			$('#afModal').closeModal();
			Session.set('isSearching', !Session.get('isSearching'));
		},
	}
});