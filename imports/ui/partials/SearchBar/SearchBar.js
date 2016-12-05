import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../../api/memos.js';
import { Label } from '../../../api/label.js';

import './SearchBar.html';
import './SearchBarItem.js';
import './labelSearchItem.js';

TemplateController('SearchBar',{
	state:{
		memoResultCount:0,
		labelResultCount:0,
	},

	onCreated(){
		this.autorun(()=>{
			this.subscribe('memos',Session.get('searchQuery'));//for search query!
			this.subscribe('label');
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
		searchedLabels(){
			const label = Label.find();
			return Label.find({},{limit:5, sort:{createdAt:-1}});
		},
		shouldSearchBarShow(){
			return Session.get('isSearching');
		},
		memoResultCount(){
			let search = Session.get('searchQuery');
			let regex = new RegExp(search,'i');
			if(search){
				this.state.memoResultCount = Memos.find({$or:[{name:regex},{description:regex}]}).count();
			}
			return this.state.memoResultCount;
		},
		labelResultCount(){
			this.state.labelResultCount = Label.find().count();
			return this.state.labelResultCount;
		},
		noResult(){
			if(this.state.memoResultCount == 0 && this.state.labelResultCount == 0){
				return true;
			}
		},
	},
	events:{
		'mouseover .search-nav-bar'(){
			Session.set('isHoveringSearchBar',true);
		},
		'mouseout .search-nav-bar'(){
			Session.set('isHoveringSearchBar',false);
		},
	}
});