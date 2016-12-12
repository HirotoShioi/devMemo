import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../api/memos.js';
import { Label } from '../../api/label.js';

import './LabelDetail.html';
import '../partials/Memo.js';
import '../partials/List/SingleList.js';
import '../partials/ViewBtn.js';
import '../partials/Loading.js';
import '../partials/InfiniteScroll/InfiniteScroll.js';

TemplateController('LabelDetail', {
	state:{
		limit:16,
		memoCount:0,
	},

	onCreated(){
		const self = this;
		self.autorun(()=>{
			self.subscribe('label');
			self.subscribe('memos');
		});
	},

	helpers:{
		memos(){
			Session.set('Title',Label.findOne({_id:this.data._id},{fields:{'name':1}}));

			let query = {
				labelId:this.data._id
			};
			if(Session.get('hideExpired')){
				query.status = "active";
			}
			let memos = Memos.find(query,{limit:this.state.limit, sort:{status:1, clickedAt:-1}});
			this.state.memoCount = Memos.find(query).count();
			return memos;
		},

		hasMoreContent(){
			if(this.state.memoCount > this.state.limit){
				return true;
			}
		}
	},

	events:{
		'labelDetailScrollEvent'(){
			const self = this;
			Meteor.setTimeout(()=>{
				self.state.limit += 20;
			},300);
		},
	}
});