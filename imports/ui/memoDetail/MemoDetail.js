import './MemoDetail.html';
import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../api/memos.js';

TemplateController('MemoDetail',{
	onCreated(){
	 	this.autorun(()=>{
	 		this.subscribe('singleMemo',this.data._id);
	 	});
	 	Session.set('Title',{name:"Detail"});
	},

	helpers:{
		memo(){
			const id = this.data._id;
			return Memos.findOne({_id:id});
		},
	},
});