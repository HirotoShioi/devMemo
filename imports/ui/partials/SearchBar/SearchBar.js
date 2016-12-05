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
		labelSearchLimit:3,
		labelTitle:"Recently Used",
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
				this.state.labelTitle = "Search result";
				return Memos.find({$or:[{name:regex},{description:regex}]}, {sort:{clicked:1}}).fetch();
			}else{
				this.state.labelTitle = "Frequently used";
				return Memos.find({},{limit:5, sort:{clicked:1}});
			}
		},
		labelTitle(){
			return this.state.labelTitle;
		},
		searchedLabels(){
			const label = Label.find();
			return Label.find({},{limit:this.state.labelSearchLimit, sort:{createdAt:-1}});
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
		'keyup [name="search"]'(event){
			let value = event.target.value.trim();
			Session.set('searchQuery', value);
		},
		'click .toggle-label-show'(){
			this.state.labelSearchLimit +=3;
		}
	}
});