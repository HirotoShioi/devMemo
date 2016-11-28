import './MemoDetail.html';
import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../api/memos.js';

TemplateController('MemoDetail',{
	state:{
		memos: '',
	},

	onCreated(){
	 	this.autorun(()=>{
	 		this.subscribe('singleMemo',this.data._id);
	 		this.state.memos = Memos.findOne({_id:this.data._id});
	 	});
	 	Session.set('Title',{name:"Detail"});
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