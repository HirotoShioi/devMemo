import './SearchBar.html';
import './SearchBarItem.js';
import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../../api/memos.js';
TemplateController('SearchBar',{
	onCreated(){
		this.autorun(()=>{
			this.subscribe('searchMemo',Session.get('searchQuery'));
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
		}
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