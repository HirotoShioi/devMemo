import './SearchNavBar.html';
import './SearchBarItem.js';
import { TemplateController } from 'meteor/space:template-controller';

TemplateController('SearchNavBar',{
	onCreated(){
		this.autorun(()=>{
			this.subscribe('memos',Session.get('searchQuery'));//for search query!
		});
	},
	helpers:{
		searchedMemos(){
			let search = Session.get('searchQuery');
			let regex = new RegExp(search,'i');
			//need research on description ( full text search)
			if(search){
				return Memos.find({$or:[{name:regex},{description:regex}]}).fetch();
			}
		},
	},
	events:{
		'keyup [name="search"]'(event){
			let value = event.target.value.trim();
			Session.set('searchQuery', value);
		},
		'click .fa-arrow-left'(){
			Session.set('isSearchNavShown',false);
			Session.set('searchQuery','');
		},
	},
});