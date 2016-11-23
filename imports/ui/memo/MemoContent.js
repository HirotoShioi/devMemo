import './MemoContent.html';
import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../api/memos.js';

//partials
import '../partials/Memo.js';
import '../partials/List/List.js';
import '../partials/ViewBtn.js';

TemplateController('MemoContent',{
	onCreated(){
		this.autorun(()=>{
			this.subscribe('memos');
		});
	},

	helpers:{
		memos(){
			return Memos.find({},{sort:{createdAt:-1}});
		},
	},
});