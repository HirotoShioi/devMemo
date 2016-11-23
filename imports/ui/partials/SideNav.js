import { TemplateController } from 'meteor/space:template-controller';
import './SideNav.html';
import './NewMemoModal.js';

TemplateController('SideNav',{
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
			Session.set('isSearching', false);
		},
		'focus [name="search"]'(event){
			if(Session.get('searchQuery')){
				Session.set('isSearching', true);
			};
		}
	}
});