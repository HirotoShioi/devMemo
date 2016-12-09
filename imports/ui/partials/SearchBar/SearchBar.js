import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../../api/memos.js';

import './SearchBar.html';
import './SearchBarItem.js';

TemplateController('SearchBar',{
	state:{
		memoResultCount:0,
		isSearching:false,
		memoSearchLimit:7,
		labelTitle:"Recently Used",
	},

	onCreated(){
		this.autorun(()=>{
			this.subscribe('memos');//for search query!
		});
	},
	helpers:{
		searchedMemos(){
			let search = Session.get('searchQuery');
			let regex = new RegExp(search,'i');
			//need research on description ( full text search)
			if(search){
				this.state.isSearching = true;
				this.state.labelTitle = "Search result";
				return Memos.find({$or:[{name:regex},{description:regex}]}, {limit:this.state.memoSearchLimit, sort:{clicked:1}}).fetch();
			}else{
				this.state.labelTitle = "Frequently used";
				let projection = {limit:this.state.memoSearchLimit, sort:{clicked:1}};
				return Memos.find({},projection);
			}
		},
		labelTitle(){
			return this.state.labelTitle;
		},
		shouldSearchBarShow(){
			return Session.get('isSearching');
		},
		memoResultCount(){
			let search = Session.get('searchQuery');
			let regex = new RegExp(search,'i');
			if(search){
				this.state.memoResultCount = Memos.find({$or:[{name:regex},{description:regex}]}).count();
				return this.state.memoResultCount;
			}
		},
		noResult(){
			if(this.state.memoResultCount == 0 && this.state.isSearching){
				return true;
			}
		},
	},
	events:{
		'keyup [name="search"]'(event){
			let value = event.target.value.trim();
			Session.set('searchQuery', value);
		},
		'click .toggle-memo-show'(){
			if(this.state.memoSearchLimit < 30){
				this.state.memoSearchLimit += 10;
			}
			return false;
		}
	}
});