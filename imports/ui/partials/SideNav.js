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
		'keyup [name="search"]'(event){
			let value = event.target.value.trim();

			if( value !== ''){
				Session.set('isSearching', true);
			}else{
				Session.set('isSearching', false);
			}
			Session.set('searchQuery', value);
		},
		'focusout [name="search"]'(event){
			if(!Session.get('isHoveringSearchBar')){
				Session.set('isSearching', false);
			}
		},
		'focus [name="search"]'(event){
			if(Session.get('searchQuery')){
				Session.set('isSearching', true);
			};
		}
	}
});