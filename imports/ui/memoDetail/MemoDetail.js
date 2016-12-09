import './MemoDetail.html';
import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../api/memos.js';

TemplateController('MemoDetail',{
	state:{
		memos: '',
	},

	onCreated(){
		const self = this;
	 	self.autorun(()=>{
	 		self.subscribe('singleMemo',self.data._id);
	 		self.state.memos = Memos.findOne({_id:self.data._id});
	 	});
	},

	helpers:{
		memo(){
			return this.state.memos;
		},
	},

	events:{
		'click .memo-detail-url'(){
			window.open(this.state.memos.url,'_blank');
			return false;
		}
	},
});