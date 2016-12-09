import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../api/memos.js';
import { Label } from '../../api/label.js';

import './LabelDetail.html';
import '../partials/Memo.js';
import '../partials/List/List.js';
import '../partials/ViewBtn.js';

TemplateController('LabelDetail', {
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
			let memos = Memos.find({labelId:this.data._id});
			return memos;
		},
	},
});