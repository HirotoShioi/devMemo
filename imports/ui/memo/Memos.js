import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../api/memos.js';
import { moment } from 'meteor/momentjs:moment';
import '../partials/Loading.js';
import './Memos.html';
import '../partials/InfiniteScroll/InfiniteScroll.js';
//partials
import '../partials/Memo.js';
import '../partials/List/SingleList.js';
import '../partials/ViewBtn.js';

TemplateController('Memos',{
	state:{
		limit:16,
		memoCount:0,
	},
	onCreated(){
		const self = this;
		self.autorun(()=>{
			self.subscribe('memos');
		});
		Session.set("Title",{name:"Home"});
	},

	helpers:{
		memos(){
			let search = Session.get('searchQuery');
			let query = {};
			if(Session.get('hideExpired')){
				query.status = "active";
			}
			this.state.memoCount = Memos.find(query,{sort:{status:1,clickedAt:-1}}).count();
			return Memos.find(query,{limit:this.state.limit, sort:{status:1,clickedAt:-1}});
		},
		hasMoreContent(){
			if(this.state.memoCount > this.state.limit){
				return true;
			}
		},
	},

	events:{
		'memoScrollEvent'(event) {
			const self = this;
			Meteor.setTimeout(()=>{
				self.state.limit += 20;
			},300);
    	},
	}
});